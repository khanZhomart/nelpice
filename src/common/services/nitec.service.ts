import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { SubscriberService } from './subscriber.service'

@Injectable()
export class NitecService {
    private readonly logger = new Logger(NitecService.name)

    @Inject(SubscriberService)
    private readonly subscriberService: SubscriberService

    @Cron('* * * * * *')
    async handleTask() {
        const subs = await this.subscriberService.findAll()
    }
}