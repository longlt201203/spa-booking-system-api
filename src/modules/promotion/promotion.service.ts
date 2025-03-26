import { PromotionDocumentType } from "@db/models";
import {
	CreatePromotionRequest,
	UpdatePromotionRequest,
} from "@modules/promotion/dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PromotionService {
	constructor(
		@InjectModel("Promotion")
		private readonly promotionModel: Model<PromotionDocumentType>,
	) {}

	async create(createPromotionDto: CreatePromotionRequest) {
		const newPromotion = new this.promotionModel({
			...createPromotionDto,
			startDate: new Date(createPromotionDto.startDate),
			endDate: new Date(createPromotionDto.endDate),
		});
		return await newPromotion.save();
	}

	async update(id: string, updatePromotionDto: UpdatePromotionRequest) {
		return await this.promotionModel.findByIdAndUpdate(id, updatePromotionDto, {
			new: true,
		});
	}

	async remove(id: string) {
		return await this.promotionModel.findByIdAndDelete(id);
	}

	async getById(id: string) {
		return await this.promotionModel.findById(id);
	}

	async getAll() {
		return await this.promotionModel.find();
	}
}
