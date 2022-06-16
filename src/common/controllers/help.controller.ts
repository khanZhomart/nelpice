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
    public findAll(): Promise<Help[]> {
        return this.helpService.findAll();
    }

    @Get("answered")
    public findAllAnswered(): Promise<Help[]> {
        return this.helpService.findAllAnswered();
    }

    @Get(":id")
    public findById(@Param('id') id: string): Promise<Help> {
        return this.helpService.findById(Number(id));
    }

    @Post('save')
    public save(
        @Req() request,
        @Body('help') payload: Help
    ): Promise<Help> {
        this.logger.debug(request.body)
        return this.helpService.save(payload);
    }
}