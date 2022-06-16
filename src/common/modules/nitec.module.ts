import { Module } from "@nestjs/common";
import { NitecService } from "../services/nitec.service";
import { HelpModule } from "./help.module";
import { TusModule } from "./tus.module";

@Module({
    imports: [HelpModule, TusModule],
    providers: [NitecService]
})
export class NitecModule {}