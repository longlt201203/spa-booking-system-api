import { ApiProperty } from "@nestjs/swagger";
import {
	IsMongoId,
	IsNumber,
	IsEnum,
	IsArray,
	IsString,
} from "class-validator";
import { AppointmentStatusEnum } from "@utils";

export class CreateAppointmentRequest {
	@ApiProperty()
	@IsMongoId()
	customer: string;
	@ApiProperty()
	@IsNumber()
	total: number;

	@ApiProperty({ enum: AppointmentStatusEnum })
	@IsEnum(AppointmentStatusEnum)
	status: AppointmentStatusEnum;

	@ApiProperty()
	@IsArray()
	services: string[];
}
