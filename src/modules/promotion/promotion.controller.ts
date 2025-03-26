import {
	CreatePromotionRequest,
	UpdatePromotionRequest,
} from "@modules/promotion/dto";
import { PromotionService } from "@modules/promotion/promotion.service";
import {
	Controller,
	Post,
	Body,
	Put,
	Param,
	Delete,
	Get,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("promotions")
@ApiBearerAuth()
export class PromotionController {
	constructor(private readonly promotionService: PromotionService) {}

	@Post()
	async create(@Body() createPromotionDto: CreatePromotionRequest) {
		return this.promotionService.create(createPromotionDto);
	}

	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updatePromotionDto: UpdatePromotionRequest,
	) {
		return this.promotionService.update(id, updatePromotionDto);
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return this.promotionService.remove(id);
	}

	@Get(":id")
	async getById(@Param("id") id: string) {
		return this.promotionService.getById(id);
	}

	@Get()
	async getAll() {
		return this.promotionService.getAll();
	}
}
