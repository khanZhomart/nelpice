import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { File } from "./embeddables/file.embed";
import { Subscriber } from "./subscriber.entity";

@Entity({ name: 'help' })
export class Help {

    @PrimaryColumn()
    @Generated('increment')
    @ApiProperty()
    id: number;

    @Column({
        unique: true,
        nullable: true
    })
    @ApiProperty()
    nitec_id: string;

    @Column({
        nullable: true
    })
    @ApiProperty()
    status: string;

    @Column()
    @ApiProperty()
    text: string;

    @Column(() => File)
    @ApiProperty()
    files: File[]

    @ManyToOne(
        () => Subscriber, 
        subscriber => subscriber.requests,
        { onDelete: 'SET NULL', eager: true }
    )
    @JoinColumn({ name: 'subscriber_id' })
    @ApiProperty()
    subscriber: Subscriber
}