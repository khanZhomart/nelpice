import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subscriber } from "../entities/subscriber.entity";
import { Servable } from "./servable";

@Injectable()
export class SubscriberService implements Servable<Subscriber> {
    private readonly logger = new Logger(SubscriberService.name)

    constructor(
        @InjectRepository(Subscriber)
        private subscriberRepository: Repository<Subscriber>,
    ) {}

    public findAll(): Promise<Subscriber[]> {
        return this.subscriberRepository.find();
    }

    public findById(id: number): Promise<Subscriber> {
        return this.subscriberRepository.findOne({ where: { id } })
    }

    public save(payload: Subscriber): Promise<Subscriber> {
        this.logger.debug("payload:", payload)
        return this.subscriberRepository.save(payload);
    }

    public async remove(id: number): Promise<void> {
        await this.subscriberRepository.delete(id);
    }
}