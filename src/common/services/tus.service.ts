import { Injectable } from '@nestjs/common';
import * as tus from 'tus-js-client'
import * as https from 'https'
import * as fs from 'fs'

@Injectable()
export class TusService {
    
    public upload(urls: string[]): string[] {
        this.downloadFiles(urls)
        const filenames = this.getFilenames(urls)
        const tusUrls: string[] = []

        filenames.forEach((file) => {
            var upload = new tus.Upload(null, {
                endpoint: "https://sb.egov.kz/upload/",
                retryDelays: [0, 3000, 5000, 10000, 20000],
                metadata: {
                    filename: "src/storage/temp/" + file
                },
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

        return tusUrls;
    }

    public async downloadFiles(urls: string[]) {
        urls.forEach(async (url) => {
            https.get(url, (response) => {
                const params = url.split("/")  
                const filename = params[params.length - 1]
                const path = "src/storage/temp/" + filename
    
                const file_path = fs.createWriteStream(path)
                response.pipe(file_path)
                file_path.on('finish', () => {
                    file_path.close()
                    console.log('download of ' + params[params.length - 1] + " completed")
                })
            })
        })
    }

    private getFilenames(urls: string[]) {
        const filenames: string[] = []

        urls.forEach((url) => {
            const params = url.split("/")
            const filename = params[params.length - 1]
            filenames.push(filename)
        })

        return filenames
    }
}