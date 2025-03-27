import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

import { IPromotion } from "@db/models/promotion.model";
import { PaymentStatusEnum } from "@utils";
import { IProduct, ProductItem } from "@db/models/product.model";

export interface IProductPayment {
	orderCode?: string;
	totalAmount: number;
	description: string;
	promotion?: IPromotion;
	createdAt: Date;
	updatedAt: Date;
	payosTransactionId?: string;
	payerName?: string;
	amountPaid?: number;
	status: PaymentStatusEnum;
	product: ProductItem[];
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

	product: [
		{
			product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
			quantity: { type: Number, required: true },
			price: { type: Number, required: true },
		},
	],
	description: { type: String, required: true },
	status: { type: Number, enum: PaymentStatusEnum },
	promotion: { type: Schema.Types.ObjectId, ref: "Promotion" },
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
});

export const ProductPaymentModel = mongoose.model<
	IProductPayment,
	ProductPaymentModelType
>("ProductPayment", ProductPaymentSchema);
