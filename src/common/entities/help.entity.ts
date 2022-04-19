import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Subscriber } from "./subscriber.entity";

@Entity({ name: 'help' })
export class Help {

    @PrimaryColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    status: string;

    @ManyToOne(
        () => Subscriber, 
        subscriber => subscriber.requests,
        { onDelete: 'SET NULL', eager: true }
    )
    @JoinColumn({ name: 'subscriber_id' })
    @ApiProperty()
    subscriber: Subscriber
}