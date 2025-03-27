import { ApiProperty } from "@nestjs/swagger";
import {
	IsNumber,
	IsString,
	IsOptional,
	IsMongoId,
	IsArray,
	ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class ProductItem {
	@ApiProperty({ description: "ID của sản phẩm" })
	@IsMongoId()
	product: string;
	@ApiProperty({ description: "Số lượng sản phẩm" })
	@IsNumber()
	quantity: number;

	@ApiProperty({ description: "Giá tại thời điểm mua" })
	@IsNumber()
	price: number;
}

export class CreateProductPaymentRequest {
	@ApiProperty({ description: "Tổng số lượng sản phẩm" })
	@IsNumber()
	totalAmount: number;

	@ApiProperty({ description: "Tổng giá trị thanh toán" })
	@IsNumber()
	totalPrice: number;

	@ApiProperty({ description: "Mô tả thanh toán" })
	@IsString()
	description: string;

	@ApiProperty({ required: false, description: "ID của khuyến mãi (nếu có)" })
	@IsOptional()
	@IsMongoId()
	promotion?: string;

	@ApiProperty({ type: [ProductItem], description: "Danh sách sản phẩm" })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ProductItem)
	products: ProductItem[];
}
