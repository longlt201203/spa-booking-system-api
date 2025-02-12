import { SpaController } from "@modules/spa/spa.controller";
import { SpaService } from "@modules/spa/spa.service";
import { Module } from "@nestjs/common";

@Module({
	providers: [SpaService],
	exports: [SpaService],
	controllers: [SpaController],
})
export class SpaModule {}
