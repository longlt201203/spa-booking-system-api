import {
	Controller,
	Param,
	Body,
	Query,
	Post,
	Get,
	Put,
	Delete,
} from "@nestjs/common";
import { AccountService } from "./account.service";
import {
	CreateAccountRequest,
	UpdateAccountRequest,
	AccountQuery,
} from "./dto";
import { ApiResponseDto } from "@utils";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("account")
@ApiBearerAuth()
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post()
	async createOne(@Body() dto: CreateAccountRequest) {
		await this.accountService.createOne(dto);
		return new ApiResponseDto(null, null, "Created successfully");
	}

	@Put(":id")
	async updateOne(@Param("id") id: string, @Body() dto: UpdateAccountRequest) {
		await this.accountService.updateOne(id, dto);
		return new ApiResponseDto(null, null, "Updated successfully");
	}

	@Get()
	async findMany(@Query() query: AccountQuery) {
		const data = await this.accountService.findMany(query);
		return new ApiResponseDto(data);
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const data = await this.accountService.findOne(id);
		return new ApiResponseDto(data);
	}

	@Delete(":id")
	async deleteOne(@Param("id") id: string) {
		await this.accountService.deleteOne(id);
		return new ApiResponseDto(null, null, "Deleted successfully");
	}
}
