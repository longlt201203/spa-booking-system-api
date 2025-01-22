import mongoose, { HydratedDocument, Model, ObjectId, Schema } from "mongoose";
import { SpaDocumentType } from "./spa.model";

export interface IFeedback {
	customer: ObjectId;
	spa: SpaDocumentType;
	content: string;
	rating: number;
	createdAt: Date;
	updatedAt: Date;
}

export type FeedbackDocumentType = HydratedDocument<IFeedback>;

export type FeedbackModelType = Model<
	IFeedback,
	{},
	{},
	{},
	FeedbackDocumentType
>;

const FeedbackSchema = new Schema<IFeedback, FeedbackModelType>({
	customer: { type: Schema.Types.ObjectId, required: true },
	spa: { type: Schema.Types.ObjectId, ref: "Spa", required: true },
	content: { type: String, required: true },
	rating: { type: Number, required: true },
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
});

export const FeedbackModel = mongoose.model<IFeedback, FeedbackModelType>(
	"Feedback",
	FeedbackSchema,
);
