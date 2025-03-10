import { Controller, Post, Body, Res, Query } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentRequest } from "./dto/create-payment.request";
import { Response } from "express";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("payment")
@ApiBearerAuth()
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Post("create")
	async createPayment(
		@Body() createPaymentDto: CreatePaymentRequest,
		@Res() res: Response,
	) {
		console.log("Received request:", createPaymentDto);
		try {
			const paymentLink =
				await this.paymentService.createPayment(createPaymentDto);
			res.status(201).json({ paymentLink });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	@Post("webhook")
	async handleWebhook(
		@Body() body: any,
		@Query("signature") signature: string,
		@Res() res: Response,
	) {
		try {
			const paymentResponse = await this.paymentService.handlePaymentWebhook(
				body,
				signature,
			);
			res
				.status(200)
				.json({ message: "Payment processed successfully", paymentResponse });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
}
