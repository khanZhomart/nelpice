import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import axios, { AxiosResponse } from 'axios'
import { HelpStatusDto } from "../entities/dto/status.dto";
import { Help } from "../entities/help.entity";
import { HelpService } from "./help.service";
import { TusService } from "./tus.service";

@Injectable()
export class NitecService {
    private readonly logger = new Logger(NitecService.name)
    private readonly BASE_NITEC_URL = 'https://sb.egov.kz/api/v1/public/application'

    @Inject(HelpService)
    private readonly helpService: HelpService

    @Inject(TusService)
    private readonly tusService: TusService

    @Cron('*/20 * * * * *')
    public async handleTask() {
        const subs: Help[] = await this.helpService.findAll()
        const answered: Help[] = []

        if (subs.length === 0) {
            return
        }

        subs.forEach(async (item) => {
            const actual = await this.findActualRequestById(item.id)
            this.logger.debug('actual status', actual)

            if (actual.successfully) {
                item.answer.date = actual.answerDate
                item.answer.successfully = actual.successfully
                item.answer.text = actual.answerText

                await this.helpService.update(item)
            }
        })
    }

    private async findActualRequestById(id: number): Promise<HelpStatusDto> {
        const response = await axios.get(
            `${this.BASE_NITEC_URL}/getSupportStatus/${id}`
        )

        return response.data
    }
}