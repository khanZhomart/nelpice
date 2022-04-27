import { Column } from "typeorm";

export class Answer {

    @Column({
        type: 'date',
        nullable: true
    })
    date: Date

    @Column({
        type: 'boolean',
        default: false,
        nullable: true
    })
    successfully: boolean

    @Column({
        type: 'text',
        nullable: true
    })
    text: string
}