import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { SpaSlotDto } from "@modules/spa/dto/spa-slot.dto";

export class CreateSpaRequest {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	spaOwner: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	email: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	phone: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	logo: string;

	@ApiProperty({ type: [String] })
	@IsArray()
	images: string[];

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	address: string;

	@ApiProperty({ type: [SpaSlotDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => SpaSlotDto)
	slots: SpaSlotDto[];
}
