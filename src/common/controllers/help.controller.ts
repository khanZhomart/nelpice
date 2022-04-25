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

    @Get(":id")
    public findById(@Param('id') id: string): Promise<Help> {
        return this.helpService.findById(Number(id));
    }

    @Get("subscriber/:id")
    public findAllBySubscriber(@Param('id') id: string): Promise<Help[]> {
        return this.helpService.findAllBySubscriber(Number(id));
    }

    @Post('save')
    public save(
        @Req() request,
        @Body('user_id') id: number, 
        @Body('help') payload: Help
    ): Promise<Help> {
        this.logger.debug(request.body)
        return this.helpService.save(id, payload);
    }
}