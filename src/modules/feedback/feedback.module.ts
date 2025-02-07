import { FeedbackController } from "@modules/feedback/feedback.controller";
import { FeedbackService } from "@modules/feedback/feedback.service";
import { Module } from "@nestjs/common";

@Module({
	providers: [FeedbackService],
	controllers: [FeedbackController],
})
export class FeedbackModule {}
