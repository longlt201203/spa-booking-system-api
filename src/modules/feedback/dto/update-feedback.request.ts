import { CreateFeedbackRequest } from "@modules/feedback/dto/create-feedback.request";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateFeedbackRequest extends PartialType(CreateFeedbackRequest) {}
