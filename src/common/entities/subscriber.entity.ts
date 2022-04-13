import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Help } from "./help.entity";


@Entity({ name: 'subscriber' })
export class Subscriber {

    @PrimaryColumn()
    id: number;

    @Column()
    createdAt: Date

    @OneToMany(() => Help, help => help.subscriber)
    requests: Help[]
}