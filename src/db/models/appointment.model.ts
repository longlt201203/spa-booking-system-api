import { AppointmentStatusEnum } from "@utils";
import mongoose, { HydratedDocument, Model, ObjectId, Schema } from "mongoose";
import { SpaDocumentType } from "./spa.model";
import { AppointmentServiceDocumentType } from "./appointment-service.model";
import { AccountDocumentType } from "@db/models/account.model";

export interface IAppointment {
	customer: AccountDocumentType[];
	customerName: string;
	customerPhone: string;
	customerEmail: string;
	total: number;
	createdAt: Date;
	updatedAt: Date;
	status: AppointmentStatusEnum;
	services: AppointmentServiceDocumentType[];
}

export type AppointmentDocumentType = HydratedDocument<IAppointment>;

export type AppointmentModelType = Model<
	IAppointment,
	{},
	{},
	{},
	AppointmentDocumentType
>;

const AppointmentSchema = new Schema<IAppointment, AppointmentModelType>({
	customer: [{ type: [Schema.Types.ObjectId], ref: "Account" }],
	total: { type: Number, required: true },
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
	status: { type: Number, enum: AppointmentStatusEnum },
	services: [{ type: [Schema.Types.ObjectId], ref: "Service" }],
});

export const AppointmentModel = mongoose.model<
	IAppointment,
	AppointmentModelType
>("Appointment", AppointmentSchema);
