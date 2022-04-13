import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subscriber } from "../entities/subscriber.entity";
import { Servable } from "./servable";

@Injectable()
export class SubscriberService implements Servable<Subscriber> {
    constructor(
        @InjectRepository(Subscriber)
        private subscriberRepository: Repository<Subscriber>,
    ) {}

    findAll(): Promise<Subscriber[]> {
        return this.subscriberRepository.find();
    }

    findById(id: number): Promise<Subscriber> {
        return this.subscriberRepository.findOne({ where: { id } })
    }

    save(payload: Subscriber): Promise<Subscriber> {
        return this.subscriberRepository.save(payload);
    }

    async remove(id: number): Promise<void> {
        await this.subscriberRepository.delete(id);
    }
}