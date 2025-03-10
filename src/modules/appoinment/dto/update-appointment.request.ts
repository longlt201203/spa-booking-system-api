import { ApiProperty } from "@nestjs/swagger";
import {
	IsString,
	IsNumber,
	IsEnum,
	IsArray,
	IsMongoId,
} from "class-validator";
import { AppointmentStatusEnum } from "@utils";

export class UpdateAppointmentRequest {
	@ApiProperty()
	@IsMongoId()
	customer: string;

	@ApiProperty()
	@IsMongoId()
	spa: string;

	@ApiProperty()
	@IsMongoId()
	spaStaff: string;

	@ApiProperty()
	@IsString()
	customerName: string;

	@ApiProperty()
	@IsString()
	customerPhone: string;

	@ApiProperty()
	@IsString()
	customerEmail: string;

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
