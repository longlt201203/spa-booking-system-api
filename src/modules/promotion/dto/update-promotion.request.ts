import { PartialType } from "@nestjs/mapped-types";
import { CreatePromotionRequest } from "./create-promotion.request";

export class UpdatePromotionRequest extends PartialType(
	CreatePromotionRequest,
) {}
