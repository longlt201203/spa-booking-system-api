import { ApiProperty } from "@nestjs/swagger";

export class TotalPaymentResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	service: string;

	@ApiProperty()
	promotion?: string;

	@ApiProperty()
	originalPrice: number;

	@ApiProperty()
	deposit: number;

	@ApiProperty()
	remainingAmount: number;

	@ApiProperty()
	finalAmount: number;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
}
