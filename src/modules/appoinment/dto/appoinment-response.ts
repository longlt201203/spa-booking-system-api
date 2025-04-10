import { AppointmentDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";
import { AppointmentStatusEnum } from "@utils";

export class AppointmentResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	customerName: string;

	@ApiProperty()
	total: number;

	@ApiProperty({ enum: AppointmentStatusEnum })
	status: AppointmentStatusEnum;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
	@ApiProperty({ description: "Thời gian cuộc hẹn" })
	time: string;
	@ApiProperty({ description: "Ngày của cuộc hẹn" })
	date: string;
}
