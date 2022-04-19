import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriberController } from "../controllers/subscriber.controller";
import { Subscriber } from "../entities/subscriber.entity";
import { SubscriberService } from "../services/subscriber.service";

@Module({
    imports: [TypeOrmModule.forFeature([Subscriber])],
    providers: [SubscriberService],
    controllers: [SubscriberController],
    exports: [SubscriberService]
})
export class SubscriberModule {}