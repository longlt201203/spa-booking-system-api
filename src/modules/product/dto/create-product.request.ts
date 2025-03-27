import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsMongoId, IsOptional } from "class-validator";

export class CreateProductRequest {
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNumber()
	quantity: number;

	@ApiProperty()
	@IsString()
	description: string;

	@ApiProperty()
	@IsNumber()
	price: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsMongoId()
	promotion?: string;

	@ApiProperty()
	@IsMongoId()
	category: string;

	@ApiProperty()
	@IsString()
	image: string;

	@ApiProperty()
	@IsNumber()
	stock: number;
}
