import { PromotionStatusEnum } from "@utils";
import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IPromotion {
	code: string;
	status: PromotionStatusEnum;
	startDate: Date;
	endDate: Date;
	fixedDiscountAmount: number;
	discountPercentage: number;
	createdAt: Date;
	updatedAt: Date;
}

export type PromotionDocumentType = HydratedDocument<IPromotion>;

export type PromotionModelType = Model<
	IPromotion,
	{},
	{},
	{},
	PromotionDocumentType
>;

const PromotionSchema = new Schema<IPromotion, PromotionDocumentType>({
	code: { type: String, required: true, unique: true },
	status: {
		type: Number,
		required: true,
		enum: PromotionStatusEnum,
		default: PromotionStatusEnum.AVAILABLE,
	},
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	fixedDiscountAmount: { type: Number, default: 0 },
	discountPercentage: { type: Number, default: 0 },
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
});

export const PromotionModel = mongoose.model<IPromotion, PromotionDocumentType>(
	"Promotion",
	PromotionSchema,
);
