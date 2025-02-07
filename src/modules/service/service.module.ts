import { ServiceController } from "@modules/service/service.controller";
import { ServiceService } from "@modules/service/service.service";
import { Module } from "@nestjs/common";

@Module({
	providers: [ServiceService],
	controllers: [ServiceController],
})
export class ServiceModule {}
