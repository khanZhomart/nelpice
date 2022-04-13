import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HelpController } from "../controllers/help.controller";
import { Help } from "../entities/help.entity";
import { HelpService } from "../services/help.service";

@Module({
    imports: [TypeOrmModule.forFeature([Help])],
    providers: [HelpService],
    controllers: [HelpController]
})
export class HelpModule {}