import { IService } from "@db/models/service.model";
import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";

export interface ITotalPayment {
	service: IService;
	promotion?: Types.ObjectId;
	originalPrice: number;
	deposit: number;
	remainingAmount: number;
	finalAmount: number;
	createdAt: Date;
	updatedAt: Date;
}

export type TotalPaymentDocumentType = HydratedDocument<ITotalPayment>;

export type TotalPaymentModelType = Model<
	ITotalPayment,
	{},
	{},
	{},
	TotalPaymentDocumentType
>;

const TotalPaymentSchema = new Schema<ITotalPayment, TotalPaymentDocumentType>({
	service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
	promotion: { type: Schema.Types.ObjectId, ref: "Promotion" },
	originalPrice: { type: Number, required: true },
	deposit: { type: Number, required: true },
	remainingAmount: { type: Number, required: true },
	finalAmount: { type: Number, required: true },
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
});

export const TotalPaymentModel = mongoose.model<
	ITotalPayment,
	TotalPaymentDocumentType
>("TotalPayment", TotalPaymentSchema);
