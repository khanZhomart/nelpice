import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Help } from "../entities/help.entity";
import { SubscriberService } from "./subscriber.service";
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
        @Inject(SubscriberService)
        private readonly subscriberService: SubscriberService,
        @Inject(TusService)
        private readonly tusService: TusService
    ) {}

    public findAll(): Promise<Help[]> {
        return this.helpRepository.find()
    }

    public findAllBySubscriber(id: number): Promise<Help[]> {
        return this.helpRepository.find({ where: { subscriber: { id } } });
    }

    public findById(id: number): Promise<Help> {
        return this.helpRepository.findOne({ where: { id } });
    }

    public async save(payload: Help, id?: number): Promise<any> {
        if (id) {
            const subscriber = await this.subscriberService.findById(id)
            payload.subscriber = subscriber
        }

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
                        const res = await axios.post(
                            'https://sb.egov.kz/api/v1/public/application/registerSupportRequest',
                            {
                                requestText: payload.text,
                                attachmentDto: {
                                    url: tus_urls[0],
                                    name: "",
                                    size: payload.files[0].size,
                                    contentType: ""
                                }
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