import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Answer } from "./embeddables/answer.embed";
import { File } from "./embeddables/file.embed";

@Entity({ name: 'help' })
export class Help {

    @PrimaryColumn()
    @Generated('increment')
    @ApiProperty()
    id: number;

    @Column({
        nullable: true
    })
    @ApiProperty()
    subscriber_id: number;

    @Column({
        unique: true,
        nullable: true
    })
    @ApiProperty()
    nitec_id: string;

    @Column(() => Answer)
    @ApiProperty()
    answer: Answer

    @Column()
    @ApiProperty()
    text: string;

    @Column()
    @ApiProperty()
    senderFio: string;

    @Column()
    @ApiProperty()
    senderEmail: string;

    @Column()
    @ApiProperty()
    senderPhone: string;

    @Column()
    @ApiProperty()
    senderOrgBin: string;

    @Column()
    @ApiProperty()
    senderOrgName: string;

    @Column(() => File)
    @ApiProperty()
    files: File[]
}