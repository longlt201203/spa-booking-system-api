import { ApiProperty } from "@nestjs/swagger";
import { SpaDocumentType } from "@db/models";
import { SpaSlotDto } from "@modules/spa/dto/spa-slot.dto";

export class SpaResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	spaOwner: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	phone: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	logo: string;

	@ApiProperty({ type: [String] })
	images: string[];

	@ApiProperty()
	address: string;

	@ApiProperty({ type: [SpaSlotDto] })
	slots: SpaSlotDto[];

	static fromDocument(spa: SpaDocumentType): SpaResponse {
		return {
			id: spa._id.toString(),
			name: spa.name,
			spaOwner: spa.spaOwner.toString(),
			email: spa.email,
			phone: spa.phone,
			description: spa.description,
			logo: spa.logo,
			images: spa.images,
			address: spa.address,
			slots: spa.slots.map((slot) => ({
				startTime: slot.startTime,
				endTime: slot.endTime,
			})),
		};
	}

	static fromDocuments(spas: SpaDocumentType[]): SpaResponse[] {
		return spas.map(this.fromDocument);
	}
}
