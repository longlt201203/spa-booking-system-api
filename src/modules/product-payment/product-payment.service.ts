import { ProductDocumentType } from "@db/models";
import { ProductPaymentDocumentType } from "@db/models/product-payment.model";
import {
	CreateProductPaymentRequest,
	ProductPaymentResponse,
} from "@modules/product-payment/dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaymentStatusEnum } from "@utils";
import { Model } from "mongoose";

const PayOS = require("@payos/node");

@Injectable()
export class ProductPaymentService {
	private payos: any;

	constructor(
		@InjectModel("ProductPayment")
		private readonly productPaymentModel: Model<ProductPaymentDocumentType>,
		@InjectModel("Product")
		private readonly productModel: Model<ProductDocumentType>,
	) {
		this.payos = new PayOS(
			process.env.PAYOS_CLIENT_ID,
			process.env.PAYOS_API_KEY,
			process.env.PAYOS_CHECKSUM_KEY,
		);
	}

	async createProductPayment(
		createProductPaymentDto: CreateProductPaymentRequest,
	): Promise<string> {
		const { totalAmount, totalPrice, description, promotion } =
			createProductPaymentDto;
		const orderCode = Math.floor(100000 + Math.random() * 900000);

		const productPayment = new this.productPaymentModel({
			orderCode,
			totalAmount,
			totalPrice,
			description,
			promotion,
			status: PaymentStatusEnum.PENDING,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await productPayment.save();

		const paymentData = {
			orderCode,
			amount: totalPrice, // Sử dụng totalPrice làm số tiền thanh toán
			description: description.slice(0, 25),
			returnUrl: process.env.PAYOS_RETURN_URL,
			cancelUrl: process.env.PAYOS_CANCEL_URL,
		};

		try {
			const response = await this.payos.createPaymentLink(paymentData);
			if (response && response.checkoutUrl) {
				return response.checkoutUrl;
			}
			throw new Error("Không thể tạo link thanh toán");
		} catch (error) {
			throw new Error(`Lỗi khi tạo link thanh toán: ${error.message}`);
		}
	}

	// async handleProductPaymentWebhook(body: any, signature: string): Promise<ProductPaymentResponse> {
	//     const { orderCode, amount } = body.data;

	//     const productPayment = await this.productPaymentModel.findOne({ orderCode });
	//     if (!productPayment) {
	//         throw new Error("Không tìm thấy thanh toán!");
	//     }

	//     productPayment.status = PaymentStatusEnum.SUCCESS;
	//     productPayment.amountPaid = amount;
	//     productPayment.updatedAt = new Date();
	//     await productPayment.save();

	//     return {
	//         orderCode,
	//         status: PaymentStatusEnum.SUCCESS,
	//         amount,
	//     };
	// }

	// async getAllProductPayments(): Promise<ProductPaymentDocumentType[]> {
	//     return await this.productPaymentModel.find().exec();
	// }
	async handleProductPaymentWebhook(
		body: any,
		signature: string,
	): Promise<ProductPaymentResponse> {
		const { orderCode, amount } = body.data;

		const productPayment = await this.productPaymentModel.findOne({
			orderCode,
		});
		if (!productPayment) {
			throw new Error("Không tìm thấy thanh toán!");
		}

		productPayment.status = PaymentStatusEnum.SUCCESS;
		productPayment.amountPaid = amount;
		productPayment.updatedAt = new Date();
		await productPayment.save();

		// Giảm số lượng tồn kho
		for (const item of productPayment.product) {
			const product = await this.productModel.findById(item.product);
			if (product) {
				product.quantity -= item.quantity;
				await product.save();
			}
		}

		return {
			orderCode,
			status: PaymentStatusEnum.SUCCESS,
			amount,
		};
	}

	async getAllProductPayments(): Promise<ProductPaymentDocumentType[]> {
		return await this.productPaymentModel.find().exec();
	}
}
