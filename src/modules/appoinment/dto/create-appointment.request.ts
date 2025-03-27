import { ApiProperty } from "@nestjs/swagger";
import {
	IsMongoId,
	IsNumber,
	IsEnum,
	IsArray,
	IsString,
	IsNotEmpty,
	Validate,
} from "class-validator";
import { AppointmentStatusEnum, TimeValidator } from "@utils";

export class CreateAppointmentRequest {
	@ApiProperty({ example: "customerId" })
	@IsMongoId()
	customer: string;
	@ApiProperty({ example: "staffId" })
	@IsMongoId()
	staff: string;
	@ApiProperty()
	@IsNumber()
	total: number;

	@ApiProperty({ enum: AppointmentStatusEnum })
	@IsEnum(AppointmentStatusEnum)
	status: AppointmentStatusEnum;

	@ApiProperty()
	@IsArray()
	services: string[];
	@ApiProperty({ example: "00:00" })
	@IsString({ message: "Thời gian phải là chuỗi ký tự" })
	@IsNotEmpty({ message: "Thời gian không được để trống" })
	@Validate(TimeValidator)
	time: string;
	@ApiProperty({ description: "Ngày của cuộc hẹn ở định dạng YYYY-MM-DD" })
	@IsString({ message: "Ngày phải là chuỗi ký tự" })
	@IsNotEmpty({ message: "Ngày không được để trống" })
	date: string;
}
