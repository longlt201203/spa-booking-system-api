import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class updateProductPayment {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	totalAmount: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	description?: string;
}
