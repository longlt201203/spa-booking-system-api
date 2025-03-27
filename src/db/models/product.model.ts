import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { ServiceDocumentType } from "./service.model";
import { IPromotion } from "@db/models/promotion.model";
import { ICategory } from "@db/models/category.model";

export interface ProductItem {
	product: mongoose.Types.ObjectId;
	quantity: number;
	price: number;
}
export interface IProduct {
	name: string;
	quantity: number;
	description: string;
	price: number;
	promotion?: IPromotion;
	category: ICategory;
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
});

export const ProductModel = mongoose.model<IProduct, ProductModelType>(
	"Product",
	ProductSchema,
);
