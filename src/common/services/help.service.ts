import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Help } from "../entities/help.entity";
import { SubscriberService } from "./subscriber.service";

@Injectable()
export class HelpService {
    private readonly logger = new Logger(HelpService.name)

    constructor (
        @InjectRepository(Help)
        private helpRepository: Repository<Help>,
        @Inject(SubscriberService)
        private readonly subscriberService: SubscriberService
    ) {  }

    public findAll(): Promise<Help[]> {
        return this.helpRepository.find()
    }

    public findAllBySubscriber(id: number): Promise<Help[]> {
        return this.helpRepository.find({ where: { subscriber: { id } } });
    }

    public findById(id: number): Promise<Help> {
        return this.helpRepository.findOne({ where: { id } });
    }

    public async save(id: number, payload: Help): Promise<Help> {
        var subscriber = await this.subscriberService.findById(id)

        payload.subscriber = subscriber
        
        return this.helpRepository.save(payload);
    }

    public async remove(id: number): Promise<void> {
        await this.helpRepository.delete(id);
    }
}