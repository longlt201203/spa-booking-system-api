import { ApiProperty } from "@nestjs/swagger";
import { PaymentStatusEnum } from "@utils";

export class PaymentResponse {
	@ApiProperty()
	orderCode: string;

	@ApiProperty()
	status: PaymentStatusEnum;

	@ApiProperty()
	amount: number;
}
