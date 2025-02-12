import {
	CreateSpaRequest,
	SpaResponse,
	UpdateSpaRequest,
} from "@modules/spa/dto";
import { SpaService } from "@modules/spa/spa.service";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";

@Controller("spa")
export class SpaController {
	constructor(private readonly spaService: SpaService) {}

	@Post()
	@SwaggerApiResponse(SpaResponse)
	async createOne(@Body() dto: CreateSpaRequest) {
		const data = await this.spaService.createOne(dto);
		return new ApiResponseDto(SpaResponse.fromDocument(data), null, "Success!");
	}

	@Get()
	@SwaggerApiResponse(SpaResponse, { isArray: true })
	async getAll() {
		const data = await this.spaService.getAll();
		return new ApiResponseDto(
			SpaResponse.fromDocuments(data),
			null,
			"Success!",
		);
	}

	@Get(":id")
	@SwaggerApiResponse(SpaResponse)
	async getById(@Param("id") id: string) {
		const data = await this.spaService.getById(id);
		return new ApiResponseDto(SpaResponse.fromDocument(data), null, "Success!");
	}

	@Put(":id")
	@SwaggerApiResponse(SpaResponse)
	async updateById(@Param("id") id: string, @Body() dto: UpdateSpaRequest) {
		const data = await this.spaService.updateById(id, dto);
		return new ApiResponseDto(SpaResponse.fromDocument(data), null, "Success!");
	}

	@Delete(":id")
	@SwaggerApiResponse(SpaResponse)
	async deleteById(@Param("id") id: string) {
		const data = await this.spaService.deleteById(id);
		return new ApiResponseDto(SpaResponse.fromDocument(data), null, "Success!");
	}
}
