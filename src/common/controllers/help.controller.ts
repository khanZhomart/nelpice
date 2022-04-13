import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Help } from "../entities/help.entity";
import { HelpService } from "../services/help.service";

@ApiTags('help')
@Controller('help')
export class HelpController {
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
    save(@Body() payload: Help): Promise<Help> {
        return this.helpService.save(payload);
    }
}