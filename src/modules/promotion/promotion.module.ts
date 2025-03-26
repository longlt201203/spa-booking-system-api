import { PromotionModel } from "@db/models";
import { PromotionController } from "@modules/promotion/promotion.controller";
import { PromotionService } from "@modules/promotion/promotion.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "Promotion", schema: PromotionModel.schema },
		]),
	],
	providers: [PromotionService],
	controllers: [PromotionController],
})
export class PromotionModule {}
