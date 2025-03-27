import { ApiProperty } from "@nestjs/swagger";
import { PaymentStatusEnum } from "@utils";

export class ProductPaymentResponse {
	@ApiProperty()
	orderCode: string;

	@ApiProperty()
	status: PaymentStatusEnum;

	@ApiProperty()
	amount: number;
}
