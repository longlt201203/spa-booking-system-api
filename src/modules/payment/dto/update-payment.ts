import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethodEnum, PaymentStatusEnum } from "@utils";
import {
	IsEnum,
	IsMongoId,
	IsNumber,
	IsOptional,
	IsString,
} from "class-validator";

export class UpdatePaymentRequest {
	@ApiProperty()
	@IsNumber()
	totalAmount: number;

	@ApiProperty()
	@IsEnum(PaymentMethodEnum)
	method: PaymentMethodEnum;

	@ApiProperty()
	@IsEnum(PaymentStatusEnum)
	status: PaymentStatusEnum;
}
