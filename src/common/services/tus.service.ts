import tus from 'tus-js-client';

export class TusService {
    
    public static upload(file: any): string {
        var upload = new tus.Upload(file, {
            endpoint: "https://sb.egov.kz/upload/",
            retryDelays: [0, 3000, 5000, 10000, 20000],
            metadata: {
                filename: file.name,
                filetype: file.type
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
            }
        })

        return 'ok';
    }
}