import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { IPromotion } from "@db/models/promotion.model";
import { ICategory } from "@db/models/category.model";

export interface IProduct {
	name: string;
	quantity: number;
	description: string;
	price: number;
	promotion?: IPromotion;
	category: ICategory;
	image: string;
	stock: number;
}

export type ProductDocumentType = HydratedDocument<IProduct>;

export type ProductModelType = Model<IProduct, {}, {}, {}, ProductDocumentType>;

const ProductSchema = new Schema<IProduct>({
	name: { type: String, required: true },
	quantity: { type: Number, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	promotion: { type: Schema.Types.ObjectId, ref: "Promotion" },
	category: { type: Schema.Types.ObjectId, ref: "Category" },
	image: { type: String, required: true },
	stock: { type: Number, required: true },
});

export const ProductModel = mongoose.model<IProduct, ProductModelType>(
	"Product",
	ProductSchema,
);
