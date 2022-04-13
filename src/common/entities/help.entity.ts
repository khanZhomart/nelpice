import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Subscriber } from "./subscriber.entity";

@Entity({ name: 'help' })
export class Help {

    @PrimaryColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => Subscriber, subscriber => subscriber.requests)
    subscriber: Subscriber
}