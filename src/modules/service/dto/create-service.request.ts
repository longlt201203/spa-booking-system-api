import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";

export class CreateServiceRequest {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	price: number;

	@ApiProperty({ type: [String] })
	@IsArray()
	@IsNotEmpty()
	categories: string[];
}
