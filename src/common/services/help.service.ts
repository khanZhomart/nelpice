import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Help } from "../entities/help.entity";
import { TusService } from "./tus.service";

import * as fs from 'fs'
import * as tus from 'tus-js-client'
import axios from "axios";

@Injectable()
export class HelpService {
    private readonly logger = new Logger(HelpService.name)

    constructor (
        @InjectRepository(Help)
        private helpRepository: Repository<Help>,
        @Inject(TusService)
        private readonly tusService: TusService
    ) {}

    public findAll(): Promise<Help[]> {
        return this.helpRepository.find()
    }

    public findById(id: number): Promise<Help> {
        return this.helpRepository.findOne({ where: { id } });
    }

    public async findAllAnswered(): Promise<Help[]> {
        this.logger.debug("Request to get answered")
        const helps: Help[] = await this.findAll()

        const answered_helps: Help[] = helps.filter((h) => h.answer.successfully)
        this.logger.debug(answered_helps)
        this.helpRepository.remove(answered_helps)

        return answered_helps 
    }

    public async update(payload: Help): Promise<any> {
        return this.helpRepository.save(payload)
    }

    public async save(payload: Help): Promise<any> {
        const tus_urls: string[] = []

        await this.tusService.downloadFiles(payload.files)
        await this.tusService.delay(10_000)

        payload.files.forEach((file) => {
            const filename = this.tusService.getFilename(file.url)
            const file_stream = fs.createReadStream("src/storage/temp/" + filename)

            var upload = new tus.Upload(file_stream, {
                endpoint: "https://sb.egov.kz/upload/",
                retryDelays: [0, 3000, 5000, 10000, 20000],
                metadata: {
                    filename: filename
                },
                uploadSize: Number(file.size),
                onError: function(error) {
                    console.log("Failed because: " + error)
                },
                onProgress: function(bytesUploaded, bytesTotal) {
                    var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
                    console.log(bytesUploaded, bytesTotal, percentage + "%")
                },
                onSuccess: async () => {
                    console.log("Done, location: %s", upload.url)
                    tus_urls.push(upload.url)

                    if (tus_urls.length === payload.files.length) {
                        const attachments = []

                        for (var i = 0; i < tus_urls.length; ++i) {
                            attachments.push({
                                url: tus_urls[i],
                                name: "",
                                size: payload.files[i].size,
                                contentType: ""
                            })
                        }

                        const res = await axios.post(
                            'https://sb.egov.kz/api/v1/public/application/registerSupportRequest',
                            {
                                requestText: payload.text,
                                attachmentDto: attachments,
                                senderFio: payload.senderFio,
                                senderEmail: payload.senderEmail,
                                senderPhone: payload.senderPhone,
                                senderOrgBin: payload.senderOrgBin,
                                senderOrgName: payload.senderOrgName
                            }
                        )

                        console.log(res.data)
                        payload.nitec_id = res.data
                        const result = await this.helpRepository.save(payload);
                        console.log(result)
                    }
                }
            })

            upload.start()
        })
    }

    public async remove(id: number): Promise<void> {
        await this.helpRepository.delete(id);
    }
}