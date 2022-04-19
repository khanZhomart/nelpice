import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Help } from "../entities/help.entity";
import { Subscriber } from "../entities/subscriber.entity";
import { SubscriberService } from "./subscriber.service";

@Injectable()
export class HelpService {
    private readonly logger = new Logger(HelpService.name)

    constructor(
        @InjectRepository(Help)
        private helpRepository: Repository<Help>,
        @Inject(SubscriberService)
        private readonly subscriberService: SubscriberService
    ) {}

    findAll(): Promise<Help[]> {
        return this.helpRepository.find()
    }

    findAllBySubscriber(id: number): Promise<Help[]> {
        return this.helpRepository.find({ where: { subscriber: { id } } });
    }

    findById(id: number): Promise<Help> {
        return this.helpRepository.findOne({ where: { id } });
    }

    async save(id: number, payload: Help): Promise<Help> {
        var subscriber = await this.subscriberService.findById(id)
        payload.subscriber = subscriber
        return this.helpRepository.save(payload);
    }

    async remove(id: number): Promise<void> {
        await this.helpRepository.delete(id);
    }
}