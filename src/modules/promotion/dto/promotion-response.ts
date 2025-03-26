import { ApiProperty } from "@nestjs/swagger";
import { PromotionStatusEnum } from "@utils";

export class PromotionResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	code: string;

	@ApiProperty()
	status: PromotionStatusEnum;

	@ApiProperty()
	startDate: Date;

	@ApiProperty()
	endDate: Date;

	@ApiProperty()
	fixedDiscountAmount: number;

	@ApiProperty()
	discountPercentage: number;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
}
