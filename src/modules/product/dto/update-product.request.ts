import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsMongoId, IsOptional } from "class-validator";

export class UpdateProductRequest {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	quantity?: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	price?: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsMongoId()
	promotion?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsMongoId()
	category?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	image?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	stock?: number;
}
