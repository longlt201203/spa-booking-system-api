import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum } from "class-validator";
import { PaymentMethodEnum } from "@utils";

export class CreatePaymentRequest {
	@ApiProperty()
	@IsNumber()
	totalAmount: number;

	@ApiProperty()
	@IsString()
	appointmentId: string;

	@ApiProperty()
	@IsEnum(PaymentMethodEnum)
	method: PaymentMethodEnum;
}
