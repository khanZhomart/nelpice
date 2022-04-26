import { Injectable } from '@nestjs/common';
import * as tus from 'tus-js-client'
import * as https from 'https'
import * as fs from 'fs'
import { File } from '../entities/embeddables/file.embed';
import axios from 'axios';

@Injectable()
export class TusService {
    
    public delay(t) {
        return new Promise(resolve => setTimeout(resolve, t));
    }

    public async upload(files: File[], onSuccess: any) {
        await this.downloadFiles(files)

        await this.delay(20_000)

        return this.uploadToNitec(files, onSuccess)
    }

    public async downloadFiles(files: File[]) {
        files.forEach(async (file) => {
            const params = file.url.split("/")
            const filename = params[params.length - 1]
            const path = "src/storage/temp/" + filename

            const writer = fs.createWriteStream(path)

            const response = await axios({
                method: 'get',
                url: file.url,
                responseType: 'stream'
            })

            if (response.status !== 200) {
                console.log('error', response.status)
                return
            }

            response.data.pipe(writer)

            return new Promise((resolve, reject) => {
                writer.on('finish', () => {
                    console.log('downloaded file')
                    resolve()
                })
                writer.on('error', () => reject)
            })
        })
    }

    private uploadToNitec(files: File[], callback: any) {
        const tusUrls: string[] = []

        files.forEach((file) => {
            const filename = this.getFilename(file.url)
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
                onSuccess: function() {
                    console.log("Done, location: %s", upload.url)
                    tusUrls.push(upload.url)
                }
            })

            upload.start()
        })

        return tusUrls
    }

    public getFilename(url: string) {
        const params = url.split("/")
        return params[params.length - 1]
    }
}