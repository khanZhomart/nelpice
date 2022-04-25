/*
empty response: 
{"answerDate":null,"successfully":false,"answerText":""}

normal response: 
{"answerDate":"2022-04-08T11:32:02.016","successfully":true,"answerText":"all is good"}
*/

export class HelpStatusDto {
    answerDate: Date
    successfully: boolean
    answerText: string
}