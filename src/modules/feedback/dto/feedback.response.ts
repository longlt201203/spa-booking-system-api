import { ApiProperty } from "@nestjs/swagger";
import { FeedbackDocumentType } from "@db/models";

export class FeedbackResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	customer: string;

	@ApiProperty()
	spa: string;

	@ApiProperty()
	content: string;

	@ApiProperty()
	rating: number;

	@ApiProperty()
	createdAt: Date;

	static fromDocument(feedback: FeedbackDocumentType): FeedbackResponse {
		return {
			id: feedback._id.toString(),
			customer: feedback.customer.toString(),
			spa: feedback.spa.toString(),
			content: feedback.content,
			rating: feedback.rating,
			createdAt: feedback.createdAt,
		};
	}

	static fromDocuments(feedbacks: FeedbackDocumentType[]): FeedbackResponse[] {
		return feedbacks.map(this.fromDocument);
	}
}
