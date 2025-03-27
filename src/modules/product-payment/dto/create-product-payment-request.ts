import { ApiProperty } from "@nestjs/swagger";
import {
	IsNumber,
	IsString,
	IsOptional,
	IsMongoId,
	IsArray,
	ValidateNested,
} from "class-validator";

export class CreateProductPaymentRequest {
	@ApiProperty({ description: "Tổng giá" })
	@IsNumber()
	totalAmount: number;

	@ApiProperty({ description: "Mô tả thanh toán" })
	@IsString()
	description: string;

	@ApiProperty({ required: false, description: "ID của khuyến mãi (nếu có)" })
	@IsOptional()
	@IsMongoId()
	promotion?: string;
}
