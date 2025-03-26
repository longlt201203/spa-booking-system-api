import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";

export class CreateTotalPaymentRequest {
	@ApiProperty()
	@IsMongoId()
	service: string;

	@ApiProperty()
	@IsOptional()
	@IsMongoId()
	promotion?: string;
}
