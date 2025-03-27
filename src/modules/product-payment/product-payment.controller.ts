import { Controller, Post, Body, Res, Get } from "@nestjs/common";
import { ProductPaymentService } from "./product-payment.service";

import { Response } from "express";
import { ApiBearerAuth } from "@nestjs/swagger";
import { SkipAuth } from "@modules/auth";
import { CreateProductPaymentRequest } from "@modules/product-payment/dto";
import { ProductPaymentDocumentType } from "@db/models/product-payment.model";

@Controller("product-payment")
export class ProductPaymentController {
	constructor(private readonly productPaymentService: ProductPaymentService) {}

	@Post("create")
	@ApiBearerAuth()
	async createProductPayment(
		@Body() createProductPaymentDto: CreateProductPaymentRequest,
		@Res() res: Response,
	) {
		try {
			const paymentLink = await this.productPaymentService.createProductPayment(
				createProductPaymentDto,
			);
			res.status(201).json({ paymentLink });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	@Post("webhook")
	@SkipAuth()
	async handleProductPaymentWebhook(@Body() body: any, @Res() res: Response) {
		try {
			const paymentResponse =
				await this.productPaymentService.handleProductPaymentWebhook(
					body,
					body.signature,
				);
			res
				.status(200)
				.json({ message: "Payment processed successfully", paymentResponse });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	@Get()
	@ApiBearerAuth()
	async getAllProductPayments(): Promise<ProductPaymentDocumentType[]> {
		return this.productPaymentService.getAllProductPayments();
	}
}
