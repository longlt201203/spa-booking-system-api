import { CreateTotalPaymentRequest } from "@modules/total-payment/dto/create-total-payment-request";
import { TotalPaymentService } from "@modules/total-payment/total-payment.service";
import { Controller, Post, Body } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("total-payment")
@ApiBearerAuth()
export class TotalPaymentController {
	constructor(private readonly totalPaymentService: TotalPaymentService) {}

	@Post()
	async create(@Body() createTotalPaymentDto: CreateTotalPaymentRequest) {
		return this.totalPaymentService.create(createTotalPaymentDto);
	}
}
