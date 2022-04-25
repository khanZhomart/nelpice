import { Module } from "@nestjs/common";
import { NitecService } from "../services/nitec.service";
import { HelpModule } from "./help.module";
import { SubscriberModule } from "./subscriber.module";
import { TusModule } from "./tus.module";

@Module({
    imports: [SubscriberModule, HelpModule, TusModule],
    providers: [NitecService]
})
export class NitecModule {}