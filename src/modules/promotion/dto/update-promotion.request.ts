import { ApiProperty } from "@nestjs/swagger";
import { PromotionStatusEnum } from "@utils";
import {
	IsString,
	IsNotEmpty,
	IsNumber,
	IsDateString,
	IsEnum,
	IsOptional,
} from "class-validator";

export class UpdatePromotionRequest {
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	code?: string;

	@ApiProperty({ required: false, enum: PromotionStatusEnum })
	@IsEnum(PromotionStatusEnum)
	@IsOptional()
	status?: PromotionStatusEnum;

	@ApiProperty({ required: false })
	@IsDateString()
	@IsOptional()
	startDate?: string;

	@ApiProperty({ required: false })
	@IsDateString()
	@IsOptional()
	endDate?: string;

	@ApiProperty({ required: false })
	@IsNumber()
	@IsOptional()
	fixedDiscountAmount?: number;

	@ApiProperty({ required: false })
	@IsNumber()
	@IsOptional()
	discountPercentage?: number;
}
