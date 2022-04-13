import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Subscriber } from "./subscriber.entity";

@Entity()
export class Help {

    @PrimaryColumn()
    id: number;

    @ManyToOne(() => Subscriber, subscriber => subscriber.requests)
    subscriber: Subscriber
}