import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Help } from "./help.entity";

@Entity({ name: 'subscriber' })
export class Subscriber {

    @PrimaryColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    createdAt: Date

    @OneToMany(
        () => Help, 
        help => help.subscriber,
        { cascade: ['insert', 'update'] }
    )
    @ApiProperty()
    requests: Help[]
}