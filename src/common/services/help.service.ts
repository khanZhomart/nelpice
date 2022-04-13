import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Help } from "../entities/help.entity";
import { Servable } from "./servable";

@Injectable()
export class HelpService implements Servable<Help> {
    constructor(
        @InjectRepository(Help)
        private helpRepository: Repository<Help>,
    ) {}

    findAll(): Promise<Help[]> {
        return this.helpRepository.find();
    }

    findAllBySubscriber(id: number): Promise<Help[]> {
        return this.helpRepository.find({ where: { subscriber: { id } } });
    }

    findById(id: number): Promise<Help> {
        return this.helpRepository.findOne({ where: { id } });
    }

    save(payload: Help): Promise<Help> {
        return this.helpRepository.save(payload);
    }

    async remove(id: number): Promise<void> {
        await this.helpRepository.delete(id);
    }
}