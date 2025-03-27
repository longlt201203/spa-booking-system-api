import { ApiProperty } from "@nestjs/swagger";
import {
	IsString,
	IsNumber,
	IsEnum,
	IsArray,
	IsMongoId,
	IsNotEmpty,
	Validate,
} from "class-validator";
import { AppointmentStatusEnum, TimeValidator } from "@utils";

export class UpdateAppointmentRequest {
	@ApiProperty({ example: "customerId" })
	@IsMongoId()
	customer: string;
	@ApiProperty()
	@IsNumber()
	total: number;

	@ApiProperty({ enum: AppointmentStatusEnum })
	@IsEnum(AppointmentStatusEnum)
	status: AppointmentStatusEnum;
	@ApiProperty({ example: "staffId" })
	@IsMongoId()
	staff: string;

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
