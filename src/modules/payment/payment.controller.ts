import {
	Controller,
	Post,
	Body,
	Res,
	Query,
	Get,
	Put,
	Param,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentRequest } from "./dto/create-payment.request";
import { Response } from "express";
import { ApiBearerAuth } from "@nestjs/swagger";
import { SkipAuth } from "@modules/auth";
import { PaymentDocumentType } from "@db/models";
import { UpdatePaymentRequest } from "@modules/payment/dto/update-payment";

@Controller("payment")
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Post("create")
	@ApiBearerAuth()
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
	@Get()
	@ApiBearerAuth()
	async getAllPayments(): Promise<PaymentDocumentType[]> {
		return this.paymentService.getAllPayments();
	}
	@Post("webhook")
	@SkipAuth()
	async handleWebhook(@Body() body: any, @Res() res: Response) {
		console.log("Webhook received:", { body });

		try {
			const paymentResponse = await this.paymentService.handlePaymentWebhook(
				body,
				body.signature,
			);
			res
				.status(200)
				.json({ message: "Payment processed successfully", paymentResponse });
		} catch (error) {
			console.error("Error details:", error);
			res.status(400).json({ error: error.message });
		}
	}
	@Get("cancel")
	@SkipAuth()
	cancelPayment() {
		return "Payment cancelled";
	}
	@Put(":id")
	@ApiBearerAuth()
	async updatePayment(
		@Param("id") id: string,
		@Body() updatePaymentDto: UpdatePaymentRequest,
		@Res() res: Response,
	) {
		console.log("Update request received:", { id, updatePaymentDto });
		try {
			const updatedPayment = await this.paymentService.updatePayment(
				id,
				updatePaymentDto,
			);
			res
				.status(200)
				.json({ message: "Payment updated successfully", updatedPayment });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
}
