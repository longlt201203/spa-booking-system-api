import {
	PromotionDocumentType,
	ServiceDocumentType,
	TotalPaymentDocumentType,
} from "@db/models";
import { CreateTotalPaymentRequest } from "@modules/total-payment/dto/create-total-payment-request";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class TotalPaymentService {
	constructor(
		@InjectModel("TotalPayment")
		private readonly totalPaymentModel: Model<TotalPaymentDocumentType>,
		@InjectModel("Service")
		private readonly serviceModel: Model<ServiceDocumentType>,
		@InjectModel("Promotion")
		private readonly promotionModel: Model<PromotionDocumentType>,
	) {}

	async create(createTotalPaymentDto: CreateTotalPaymentRequest) {
		const { service: serviceId, promotion: promotionId } =
			createTotalPaymentDto;

		const service = await this.serviceModel.findById(serviceId);
		if (!service) {
			throw new Error("Service not found");
		}

		const originalPrice = service.price;
		const deposit = originalPrice * 0.15;
		let remainingAmount = originalPrice - deposit;

		let finalAmount = remainingAmount;
		let appliedPromotionId: string | undefined;

		if (promotionId) {
			const promotion = await this.promotionModel.findById(promotionId);
			if (
				promotion &&
				promotion.status === 0 &&
				new Date() >= promotion.startDate &&
				new Date() <= promotion.endDate
			) {
				if (promotion.fixedDiscountAmount > 0) {
					finalAmount -= promotion.fixedDiscountAmount;
				} else if (promotion.discountPercentage > 0) {
					finalAmount -= finalAmount * (promotion.discountPercentage / 100);
				}
				appliedPromotionId = promotion._id.toString();
			}
		}

		const newTotalPayment = new this.totalPaymentModel({
			service: service._id,
			promotion: appliedPromotionId,
			originalPrice,
			deposit,
			remainingAmount,
			finalAmount,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return await newTotalPayment.save();
	}
}
