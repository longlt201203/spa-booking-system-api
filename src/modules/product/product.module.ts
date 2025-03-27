import { PromotionModel } from "@db/models";
import { ProductModel } from "@db/models/product.model";
import { ProductController } from "@modules/product/product.controller";
import { ProductService } from "@modules/product/product.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "Product", schema: ProductModel.schema },
			{ name: "Promotion", schema: PromotionModel.schema },
		]),
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
