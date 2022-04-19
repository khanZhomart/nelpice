import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { HelpService } from "./help.service";
import { SubscriberService } from './subscriber.service'

@Injectable()
export class NitecService {
    private readonly logger = new Logger(NitecService.name)

    @Inject(SubscriberService)
    private readonly subscriberService: SubscriberService

    @Inject(HelpService)
    private readonly helpService: HelpService

    @Cron('* * * * * *')
    async handleTask() {
        const subs = await this.subscriberService.findAll()
    }
}