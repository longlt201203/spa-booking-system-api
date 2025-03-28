import { ApiProperty } from "@nestjs/swagger";
import { PromotionStatusEnum } from "@utils";
import {
	IsString,
	IsNotEmpty,
	IsNumber,
	IsDateString,
	IsEnum,
} from "class-validator";

export class CreatePromotionRequest {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	code: string;

	@ApiProperty()
	@IsEnum(PromotionStatusEnum)
	status: PromotionStatusEnum;

	@ApiProperty()
	@IsDateString()
	startDate: string;

	@ApiProperty()
	@IsDateString()
	endDate: string;

	@ApiProperty()
	@IsNumber()
	fixedDiscountAmount: number;

	@ApiProperty({ required: false })
	@IsNumber()
	discountPercentage: number;
}
