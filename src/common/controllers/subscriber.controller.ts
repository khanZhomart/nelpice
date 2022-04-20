import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Subscriber } from "../entities/subscriber.entity";
import { SubscriberService } from "../services/subscriber.service";

@ApiTags('subs')
@Controller('subs')
export class SubscriberController {
    constructor(private readonly subscriberService: SubscriberService) {}

    @Get()
    public findAll(): Promise<Subscriber[]> {
        return this.subscriberService.findAll();
    }

    @Get(":id")
    public findById(@Param('id') id: string): Promise<Subscriber> {
        return this.subscriberService.findById(Number(id));
    }

    @Post('save')
    public save(@Body() payload: Subscriber): Promise<Subscriber> {
        return this.subscriberService.save(payload);
    }
}