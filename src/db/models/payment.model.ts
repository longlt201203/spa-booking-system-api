import { PaymentMethodEnum, PaymentStatusEnum } from "@utils";
import { AppointmentDocumentType } from "./appointment.model";
import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IPayment {
	amount: number;
	appointment: AppointmentDocumentType;
	createdAt: Date;
	updatedAt: Date;
	method: PaymentMethodEnum;
	status: PaymentStatusEnum;
}

export type PaymentDocumentType = HydratedDocument<IPayment>;

export type PaymentModelType = Model<IPayment, {}, {}, {}, PaymentDocumentType>;

const PaymentSchema = new Schema<IPayment, PaymentModelType>({
	amount: { type: Number, required: true },
	appointment: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Appointment",
	},
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
	method: { type: Number, enum: PaymentMethodEnum },
	status: { type: Number, enum: PaymentStatusEnum },
});

export const PaymentModel = mongoose.model<IPayment, PaymentModelType>(
	"Payment",
	PaymentSchema,
);
