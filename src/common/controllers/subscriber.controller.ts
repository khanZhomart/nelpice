import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { Subscriber } from "../entities/subscriber.entity";
import { SubscriberService } from "../services/subscriber.service";

@Controller('subs')
export class SubscriberController {
    constructor(private readonly subscriberService: SubscriberService) {}

    @Get()
    findAll(): Promise<Subscriber[]> {
        return this.subscriberService.findAll();
    }

    @Get(":id")
    findById(@Param() id: number): Promise<Subscriber> {
        return this.subscriberService.findById(id);
    }

    @Post()
    save(@Body() payload: Subscriber): Promise<Subscriber> {
        return this.subscriberService.save(payload);
    }
}