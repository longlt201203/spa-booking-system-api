import { Injectable } from "@nestjs/common";
import { FeedbackModel } from "@db/models";
import { CreateFeedbackRequest, UpdateFeedbackRequest } from "./dto";

@Injectable()
export class FeedbackService {
	async createOne(dto: CreateFeedbackRequest) {
		const feedback = new FeedbackModel(dto);
		return await feedback.save();
	}

	async getAll() {
		return FeedbackModel.find().populate("spa");
	}

	async getById(id: string) {
		return FeedbackModel.findById(id).populate("spa");
	}

	async updateById(id: string, dto: UpdateFeedbackRequest) {
		return await FeedbackModel.findByIdAndUpdate(id, dto, { new: true });
	}

	async deleteById(id: string) {
		return await FeedbackModel.findByIdAndDelete(id);
	}
}
