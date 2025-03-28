import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

import { IPromotion } from "@db/models/promotion.model";
import { PaymentStatusEnum } from "@utils";

export interface IProductPayment {
	orderCode?: string;
	address: string;
	totalAmount: number;
	description: string;
	promotion?: IPromotion;
	createdAt: Date;
	updatedAt: Date;
	payosTransactionId?: string;
	payerName?: string;
	amountPaid?: number;
	status: PaymentStatusEnum;
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

	description: { type: String, required: true },
	status: { type: Number, enum: PaymentStatusEnum },
	promotion: { type: Schema.Types.ObjectId, ref: "Promotion", required: false },
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
	address: { type: String, required: true },
});

export const ProductPaymentModel = mongoose.model<
	IProductPayment,
	ProductPaymentModelType
>("ProductPayment", ProductPaymentSchema);
