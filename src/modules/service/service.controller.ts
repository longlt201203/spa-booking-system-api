import {
	CreateServiceRequest,
	ServiceResponse,
	UpdateServiceRequest,
} from "@modules/service/dto";
import { ServiceService } from "@modules/service/service.service";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";

@Controller("service")
export class ServiceController {
	constructor(private readonly serviceService: ServiceService) {}

	@Post()
	async createOne(@Body() dto: CreateServiceRequest) {
		const data = await this.serviceService.createOne(dto);
		return { data: ServiceResponse.fromDocument(data), message: "Success!" };
	}

	@Get()
	async getAll() {
		const data = await this.serviceService.getAll();
		return { data: ServiceResponse.fromDocuments(data), message: "Success!" };
	}

	@Get(":id")
	async getById(@Param("id") id: string) {
		const data = await this.serviceService.getById(id);
		return { data: ServiceResponse.fromDocument(data), message: "Success!" };
	}

	@Put(":id")
	async updateById(@Param("id") id: string, @Body() dto: UpdateServiceRequest) {
		const data = await this.serviceService.updateById(id, dto);
		return { data: ServiceResponse.fromDocument(data), message: "Success!" };
	}

	@Delete(":id")
	async deleteById(@Param("id") id: string) {
		const data = await this.serviceService.deleteById(id);
		return { data: ServiceResponse.fromDocument(data), message: "Success!" };
	}
}
