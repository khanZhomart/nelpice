import { Module } from "@nestjs/common";
import { TusService } from "../services/tus.service";

@Module({
    providers: [TusService],
    exports: [TusService]
})
export class TusModule {}