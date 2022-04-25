import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HelpController } from "../controllers/help.controller";
import { Help } from "../entities/help.entity";
import { HelpService } from "../services/help.service";
import { SubscriberModule } from "./subscriber.module";
import { TusModule } from "./tus.module";

@Module({
    imports: [TypeOrmModule.forFeature([Help]), SubscriberModule, TusModule],
    providers: [HelpService],
    controllers: [HelpController],
    exports: [HelpService]
})
export class HelpModule {}