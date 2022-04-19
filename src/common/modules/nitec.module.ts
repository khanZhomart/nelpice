import { Module } from "@nestjs/common";
import { NitecService } from "../services/nitec.service";
import { SubscriberModule } from "./subscriber.module";

@Module({
    imports: [SubscriberModule],
    providers: [NitecService]
})
export class NitecModule {}