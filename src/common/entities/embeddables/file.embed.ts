import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";

export class File {
    
    @Column()
    @ApiProperty()
    url: string

    @Column()
    @ApiProperty()
    size: string
}