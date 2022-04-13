import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Help } from "../entities/help.entity";
import { HelpService } from "../services/help.service";

@Controller('help')
export class HelpController {
    constructor(private readonly helpService: HelpService) {}

    @Get()
    findAll(): Promise<Help[]> {
        return this.helpService.findAll();
    }

    @Get(":id")
    findById(@Param() id: number): Promise<Help> {
        return this.helpService.findById(id);
    }

    @Post()
    save(@Body() payload: Help): Promise<Help> {
        return this.helpService.save(payload);
    }
}