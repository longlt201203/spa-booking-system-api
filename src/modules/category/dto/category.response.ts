import { CategoryDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	static fromDocument(category: CategoryDocumentType): CategoryResponse {
		return {
			id: category._id.toString(),
			name: category.name,
		};
	}

	static fromDocuments(categories: CategoryDocumentType[]): CategoryResponse[] {
		return categories.map(this.fromDocument);
	}
}
