import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import axios, { AxiosResponse } from 'axios'
import { HelpDto } from "../entities/dto/help.dto";
import { HelpStatusDto } from "../entities/dto/status.dto";
import { Help } from "../entities/help.entity";
import { HelpService } from "./help.service";
import { SubscriberService } from './subscriber.service'
import { TusService } from "./tus.service";

@Injectable()
export class NitecService {
    private readonly logger = new Logger(NitecService.name)
    private readonly BASE_NITEC_URL = 'https://sb.egov.kz/api/v1/public/application'

    @Inject(SubscriberService)
    private readonly subscriberService: SubscriberService

    @Inject(HelpService)
    private readonly helpService: HelpService

    @Inject(TusService)
    private readonly tusService: TusService

    @Cron('* * * * * *')
    public async handleTask() {
        // const subs: Help[] = await this.helpService.findAll()
        // const answered: Help[] = []

        // subs.forEach(async (item) => {
        //     const actual = await this.findActualRequestById(item.id)

        //     if (actual.answerText !== item.status) {
        //         return answered.push(item)
        //     }
        // })
    }

    public async sendRequestToNitec(payload: Help) {
        var request: HelpDto

        request.requestText = payload.text
    }

    private async findActualRequestById(id: number): Promise<HelpStatusDto> {
        const response = await axios.get(
            `${this.BASE_NITEC_URL}/getSupportStatus/${id}`
        )

        return response.data
    }
}