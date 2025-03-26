import mongoose, { HydratedDocument, Model, ObjectId, Schema } from "mongoose";

export interface IBlog {
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	url: string;
}

export type BlogDocumentType = HydratedDocument<IBlog>;

export type BlogModelType = Model<IBlog, {}, {}, {}, BlogDocumentType>;

const BlogSchema = new Schema<IBlog, BlogDocumentType>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	url: { type: String, required: true },
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
});

export const BlogModel = mongoose.model<IBlog, BlogDocumentType>(
	"Blog",
	BlogSchema,
);
