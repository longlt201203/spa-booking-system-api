import { AppointmentStatusEnum } from "@utils";
import mongoose, { HydratedDocument, Model, ObjectId, Schema } from "mongoose";
import { SpaDocumentType } from "./spa.model";
import { AppointmentServiceDocumentType } from "./appointment-service.model";

export interface IAppointment {
	customer: ObjectId;
	spa: SpaDocumentType;
	spaStaff: ObjectId;
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
	customer: { type: Schema.Types.ObjectId, required: true },
	spa: { type: Schema.Types.ObjectId, required: true, ref: "Spa" },
	spaStaff: { type: Schema.Types.ObjectId, required: true },
	customerName: { type: String, required: true },
	customerPhone: { type: String, required: true },
	customerEmail: { type: String, required: true },
	total: { type: Number, required: true },
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
	status: { type: Number, enum: AppointmentStatusEnum },
	services: [{ type: [Schema.Types.ObjectId], ref: "AppointmentService" }],
});

export const AppointmentModel = mongoose.model<
	IAppointment,
	AppointmentModelType
>("Appointment", AppointmentSchema);
