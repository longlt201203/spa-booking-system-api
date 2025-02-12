import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SpaSlotDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	startTime: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	endTime: string;
}
