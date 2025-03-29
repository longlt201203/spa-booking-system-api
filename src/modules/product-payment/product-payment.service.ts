import { PromotionDocumentType } from "@db/models";
import { ProductPaymentDocumentType } from "@db/models/product-payment.model";
import {
	CreateProductPaymentRequest,
	ProductPaymentResponse,
} from "@modules/product-payment/dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaymentStatusEnum, PromotionStatusEnum } from "@utils";
import { Model } from "mongoose";

const PayOS = require("@payos/node");

@Injectable()
export class ProductPaymentService {
	private payos: any;

	constructor(
		@InjectModel("ProductPayment")
		private readonly productPaymentModel: Model<ProductPaymentDocumentType>,
		@InjectModel("Promotion")
		private readonly promotionModel: Model<PromotionDocumentType>,
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
		const { totalAmount, description, promotion, address } =
			createProductPaymentDto;
		const orderCode = Math.floor(100000 + Math.random() * 900000);

		let discountAmount = 0;
		let finalAmount = totalAmount;

		if (promotion) {
			const promo = await this.promotionModel.findById(promotion);
			if (!promo || promo.status !== PromotionStatusEnum.AVAILABLE) {
				throw new Error("Khuyến mãi không hợp lệ hoặc không tồn tại");
			}

			const now = new Date();
			if (now < promo.startDate || now > promo.endDate) {
				throw new Error("Khuyến mãi đã hết hạn hoặc chưa bắt đầu");
			}

			if (promo.fixedDiscountAmount > 0) {
				discountAmount = promo.fixedDiscountAmount;
			} else if (promo.discountPercentage > 0) {
				discountAmount = (totalAmount * promo.discountPercentage) / 100;
			}

			discountAmount = Math.min(discountAmount, totalAmount);
			finalAmount = totalAmount - discountAmount;
		}

		const productPayment = new this.productPaymentModel({
			orderCode,
			totalAmount,
			discountAmount,
			finalAmount,
			description,
			address,
			promotion,
			status: PaymentStatusEnum.PENDING,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await productPayment.save();

		const paymentData = {
			orderCode,
			amount: finalAmount,
			address: address,
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

		return {
			orderCode,
			status: PaymentStatusEnum.SUCCESS,
			amount,
		};
	}
	async update(
		id: string,
		updateProductPaymentDto: Partial<CreateProductPaymentRequest>,
	): Promise<ProductPaymentDocumentType> {
		const payment = await this.productPaymentModel.findById(id).exec();
		if (!payment) {
			throw new Error("Không tìm thấy thanh toán!");
		}
		Object.assign(payment, updateProductPaymentDto);
		payment.updatedAt = new Date();
		return payment.save();
	}

	async getAllPayments(): Promise<ProductPaymentDocumentType[]> {
		return await this.productPaymentModel.find().populate("promotion").exec();
	}
	// async delete(id: string): Promise<void> {
	// 	const payment = await this.productPaymentModel.findByIdAndDelete(id).exec();
	// 	if (!payment) {
	// 		throw new Error("Không tìm thấy thanh toán!");
	// 	}
	// 	await payment.remove();
	// }
}
