import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateFeedbackRequest {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	customer: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	spa: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	content: string;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	rating: number;
}
