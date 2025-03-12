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

	@ApiProperty()
	status: AppointmentStatusEnum;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	static fromDocument(d: AppointmentDocumentType): AppointmentResponse {
		return {
			id: d._id.toString(),
			customerName: d.customerName,
			createdAt: d.createdAt,
			updatedAt: d.updatedAt,
			total: d.total,
			status: AppointmentStatusEnum.ACCEPTED,
		};
	}

	static fromDocuments(d: AppointmentDocumentType[]) {
		return d.map(this.fromDocument);
	}
}
