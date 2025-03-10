import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";

import { FeedbackService } from "@modules/feedback/feedback.service";
import {
	CreateFeedbackRequest,
	FeedbackResponse,
	UpdateFeedbackRequest,
} from "@modules/feedback/dto";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("feedback")
@ApiBearerAuth()
export class FeedbackController {
	constructor(private readonly feedbackService: FeedbackService) {}

	@Post()
	async createOne(@Body() dto: CreateFeedbackRequest) {
		const data = await this.feedbackService.createOne(dto);
		return { data: FeedbackResponse.fromDocument(data), message: "Success!" };
	}

	@Get()
	async getAll() {
		const data = await this.feedbackService.getAll();
		return { data: FeedbackResponse.fromDocuments(data), message: "Success!" };
	}

	@Get(":id")
	async getById(@Param("id") id: string) {
		const data = await this.feedbackService.getById(id);
		return { data: FeedbackResponse.fromDocument(data), message: "Success!" };
	}

	@Put(":id")
	async updateById(
		@Param("id") id: string,
		@Body() dto: UpdateFeedbackRequest,
	) {
		const data = await this.feedbackService.updateById(id, dto);
		return { data: FeedbackResponse.fromDocument(data), message: "Success!" };
	}

	@Delete(":id")
	async deleteById(@Param("id") id: string) {
		const data = await this.feedbackService.deleteById(id);
		return { data: FeedbackResponse.fromDocument(data), message: "Success!" };
	}
}
