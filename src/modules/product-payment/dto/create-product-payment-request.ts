import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional, IsMongoId } from "class-validator";

export class CreateProductPaymentRequest {
	@ApiProperty({ description: "Tổng giá" })
	@IsNumber()
	totalAmount: number;

	@ApiProperty({ description: "Mô tả thanh toán" })
	@IsString()
	description: string;

	@ApiProperty({ required: false, description: "ID của khuyến mãi (nếu có)" })
	@IsOptional()
	@IsString()
	promotion?: string;
}
