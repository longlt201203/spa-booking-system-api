import { PromotionModel, ServiceModel, TotalPaymentModel } from "@db/models";
import { TotalPaymentController } from "@modules/total-payment/total-payment.controller";
import { TotalPaymentService } from "@modules/total-payment/total-payment.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "TotalPayment", schema: TotalPaymentModel.schema },
			{ name: "Service", schema: ServiceModel.schema },
			{ name: "Promotion", schema: PromotionModel.schema },
		]),
	],
	providers: [TotalPaymentService],
	controllers: [TotalPaymentController],
	exports: [
		MongooseModule.forFeature([
			{ name: "TotalPayment", schema: TotalPaymentModel.schema },
		]),
	],
})
export class TotalPaymentModule {}
