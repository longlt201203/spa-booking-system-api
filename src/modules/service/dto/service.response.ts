import { ApiProperty } from "@nestjs/swagger";
import { ServiceDocumentType } from "@db/models";

export class ServiceResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	price: number;

	@ApiProperty({ type: [String] })
	categories: string[];

	static fromDocument(service: ServiceDocumentType): ServiceResponse {
		return {
			id: service._id.toString(),
			name: service.name,
			description: service.description,
			price: service.price,
			categories: service.categories.map((id) => id.toString()),
		};
	}

	static fromDocuments(services: ServiceDocumentType[]): ServiceResponse[] {
		return services.map(this.fromDocument);
	}
}
