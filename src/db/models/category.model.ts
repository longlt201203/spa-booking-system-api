import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface ICategory {
	name: string;
}

export type CategoryDocumentType = HydratedDocument<ICategory>;
export type CategoryModelType = Model<
	ICategory,
	{},
	{},
	{},
	CategoryDocumentType
>;
const categorySchema = new Schema<ICategory, CategoryModelType>({
	name: { type: String, required: true, unique: true },
});
export const CategoryModel = mongoose.model<ICategory, CategoryModelType>(
	"Category",
	categorySchema,
);
