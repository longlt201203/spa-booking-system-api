import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SpaController } from "./spa.controller";
import { SpaService } from "./spa.service";
import { SpaModel } from "@db/models";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "Spa", schema: SpaModel.schema }]),
	],

	providers: [SpaService],
	controllers: [SpaController],
	exports: [MongooseModule],
})
export class SpaModule {}
