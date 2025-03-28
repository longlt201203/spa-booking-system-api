import {
	Controller,
	Post,
	Body,
	Res,
	Get,
	Put,
	Param,
	Delete,
} from "@nestjs/common";
import { ProductPaymentService } from "./product-payment.service";

import { Response } from "express";
import { ApiBearerAuth } from "@nestjs/swagger";
import { SkipAuth } from "@modules/auth";
import { CreateProductPaymentRequest } from "@modules/product-payment/dto";
import { updateProductPayment } from "@modules/product-payment/dto/update-product-payment";

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
	async getAllPayments(@Res() res: Response) {
		try {
			const payments = await this.productPaymentService.getAllPayments();
			res.status(200).json(payments);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	@Put(":id")
	@ApiBearerAuth()
	async updatePayment(
		@Param("id") id: string,
		@Body() updateProductPaymentDto: updateProductPayment,
		@Res() res: Response,
	) {
		try {
			const updatedPayment = await this.productPaymentService.update(
				id,
				updateProductPaymentDto,
			);
			res.status(200).json(updatedPayment);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
	// @Delete(":id")
	// @ApiBearerAuth()
	// async deletePayment(@Param("id") id: string, @Res() res: Response) {
	// 	try {
	// 		await this.productPaymentService.delete(id);
	// 		res.status(204).send();
	// 	} catch (error) {
	// 		res.status(404).json({ error: error.message });
	// 	}
	// }
}
