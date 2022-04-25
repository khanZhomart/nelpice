
/**
{
	"requestText": "test text",
	"attachmentDto": {
		"url": "https://sb.egov.kz/upload/8752e0eaf5417ca4566cb01761daa15b",
		"name": "Запрос.xml",
		"size": 1924,
		"contentType": "text/xml"
	}
}

empty response: 
{"answerDate":null,"successfully":false,"answerText":""}

normal response: 
{"answerDate":"2022-04-08T11:32:02.016","successfully":true,"answerText":"all is good"}
*/
class AttachmentDto {
    url: string;
    name: string;
    size: number;
    contentType: string;
}

export class HelpDto {
    requestText: string;
    attachmentDto: AttachmentDto;
}