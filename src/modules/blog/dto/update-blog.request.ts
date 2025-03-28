import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateBlogRequest {
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	name?: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	description?: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	url?: string;
}
