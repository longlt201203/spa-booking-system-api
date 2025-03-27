import { ProductModel, PromotionModel } from "@db/models";
import { ProductController } from "@modules/product/product.controller";
import { ProductService } from "@modules/product/product.service";
import { PromotionModule } from "@modules/promotion/promotion.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "Product", schema: ProductModel.schema },
		]),
		PromotionModule,
	],
	providers: [ProductService],
	controllers: [ProductController],
	exports: [
		MongooseModule.forFeature([
			{ name: "Product", schema: ProductModel.schema },
		]),
	],
})
export class ProductModule {}
