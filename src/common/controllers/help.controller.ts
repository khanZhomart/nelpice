import { Body, Controller, Get, Logger, Param, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { request } from "http";
import { Help } from "../entities/help.entity";
import { HelpService } from "../services/help.service";

@ApiTags('help')
@Controller('help')
export class HelpController {
    private readonly logger = new Logger(HelpController.name)

    constructor(private readonly helpService: HelpService) {}

    @Get()
    findAll(): Promise<Help[]> {
        return this.helpService.findAll();
    }

    @Get(":id")
    findById(@Param('id') id: string): Promise<Help> {
        return this.helpService.findById(Number(id));
    }

    @Get("subscriber/:id")
    findAllBySubscriber(@Param('id') id: string): Promise<Help[]> {
        return this.helpService.findAllBySubscriber(Number(id));
    }

    @Post('save')
    save(@Body('userId') id: number, @Body('help') payload: Help): Promise<Help> {
        return this.helpService.save(id, payload);
    }
}