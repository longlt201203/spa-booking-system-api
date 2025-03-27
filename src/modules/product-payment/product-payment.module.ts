import { ProductModel, ProductPaymentModel, PromotionModel } from "@db/models";
import { ProductPaymentController } from "@modules/product-payment/product-payment.controller";
import { ProductPaymentService } from "@modules/product-payment/product-payment.service";
import { PromotionModule } from "@modules/promotion/promotion.module";

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "ProductPayment", schema: ProductPaymentModel.schema },
		]),
		PromotionModule,
	],
	exports: [
		MongooseModule.forFeature([
			{ name: "ProductPayment", schema: ProductPaymentModel.schema },
		]),
		PromotionModule,
	],
	providers: [ProductPaymentService],
	controllers: [ProductPaymentController],
})
export class ProductPaymentModule {}
