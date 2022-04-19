import { Module } from "@nestjs/common";
import { NitecService } from "../services/nitec.service";
import { HelpModule } from "./help.module";
import { SubscriberModule } from "./subscriber.module";

@Module({
    imports: [SubscriberModule, HelpModule],
    providers: [NitecService]
})
export class NitecModule {}