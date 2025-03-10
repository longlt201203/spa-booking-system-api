import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import {
	CategoryResponse,
	CreateCategoryRequest,
	UpdateCategoryRequest,
} from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("category")
@ApiBearerAuth()
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@SwaggerApiResponse(CategoryResponse)
	async createOne(@Body() dto: CreateCategoryRequest) {
		const data = await this.categoryService.createOne(dto);
		return new ApiResponseDto(
			CategoryResponse.fromDocument(data),
			null,
			"Success!",
		);
	}

	@Get()
	@SwaggerApiResponse(CategoryResponse, { isArray: true })
	async getAll() {
		const data = await this.categoryService.getAll();
		return new ApiResponseDto(
			CategoryResponse.fromDocuments(data),
			null,
			"Success!",
		);
	}

	@Get(":id")
	@SwaggerApiResponse(CategoryResponse)
	async getById(@Param("id") id: string) {
		const data = await this.categoryService.getById(id);
		return new ApiResponseDto(
			CategoryResponse.fromDocument(data),
			null,
			"Success!",
		);
	}

	@Put(":id")
	@SwaggerApiResponse(CategoryResponse)
	async updateById(
		@Param("id") id: string,
		@Body() dto: UpdateCategoryRequest,
	) {
		const data = await this.categoryService.updateById(id, dto);
		return new ApiResponseDto(
			CategoryResponse.fromDocument(data),
			null,
			"Success!",
		);
	}

	@Delete(":id")
	@SwaggerApiResponse(CategoryResponse)
	async deleteById(@Param("id") id: string) {
		const data = await this.categoryService.deleteById(id);
		return new ApiResponseDto(
			CategoryResponse.fromDocument(data),
			null,
			"Success!",
		);
	}
}
