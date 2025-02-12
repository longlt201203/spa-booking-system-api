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
import { SkipAuth } from "@modules/auth";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("account")
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post()
	@SkipAuth()
	async createOne(@Body() dto: CreateAccountRequest) {
		await this.accountService.createOne(dto);
		return new ApiResponseDto(null, null, "Created successfully");
	}

	@Put(":id")
	@ApiBearerAuth()
	async updateOne(@Param("id") id: string, @Body() dto: UpdateAccountRequest) {
		await this.accountService.updateOne(id, dto);
		return new ApiResponseDto(null, null, "Updated successfully");
	}

	@Get()
	@ApiBearerAuth()
	async findMany(@Query() query: AccountQuery) {
		const data = await this.accountService.findMany(query);
		return new ApiResponseDto(data);
	}

	@Get(":id")
	@ApiBearerAuth()
	async findOne(@Param("id") id: string) {
		const data = await this.accountService.findOne(id);
		return new ApiResponseDto(data);
	}

	@Delete(":id")
	@ApiBearerAuth()
	async deleteOne(@Param("id") id: string) {
		await this.accountService.deleteOne(id);
		return new ApiResponseDto(null, null, "Deleted successfully");
	}
}
