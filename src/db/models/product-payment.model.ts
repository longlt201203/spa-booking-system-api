import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

import { IPromotion } from "@db/models/promotion.model";

export interface IProductPayment {
	orderCode?: string;
	totalAmount: number;
	description: string;
	totalPrice: number;
	promotion?: IPromotion;
	payosTransactionId?: string;
	payerName?: string;
	amountPaid?: number;
}

export type ProductPaymentDocumentType = HydratedDocument<IProductPayment>;

export type ProductPaymentModelType = Model<
	IProductPayment,
	{},
	{},
	{},
	ProductPaymentDocumentType
>;

const ProductPaymentSchema = new Schema<IProductPayment>({
	orderCode: { type: String },
	totalAmount: { type: Number, required: true },
	totalPrice: { type: Number, required: true },
	description: { type: String, required: true },
	promotion: { type: Schema.Types.ObjectId, ref: "Promotion" },
});

export const ProductPaymentModel = mongoose.model<
	IProductPayment,
	ProductPaymentModelType
>("Product", ProductPaymentSchema);
