import { ProductModel, ProductPaymentModel } from "@db/models";
import { ProductPaymentController } from "@modules/product-payment/product-payment.controller";
import { ProductPaymentService } from "@modules/product-payment/product-payment.service";

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "ProductPayment", schema: ProductPaymentModel.schema },
			{ name: "Product", schema: ProductModel.schema },
		]),
	],
	exports: [
		MongooseModule.forFeature([
			{ name: "ProductPayment", schema: ProductPaymentModel.schema },
			{ name: "Product", schema: ProductModel.schema },
		]),
	],
	providers: [ProductPaymentService],
	controllers: [ProductPaymentController],
})
export class ProductPaymentModule {}
