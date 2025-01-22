import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { ServiceDocumentType } from "./service.model";

export interface IAppointmentService {
	service: ServiceDocumentType;
	serviceName: string;
	servicePrice: number;
}

export type AppointmentServiceDocumentType =
	HydratedDocument<IAppointmentService>;

export type AppointmentServiceModelType = Model<
	IAppointmentService,
	{},
	{},
	{},
	AppointmentServiceDocumentType
>;

const AppointmentServiceSchema = new Schema<IAppointmentService>({
	service: { type: Schema.Types.ObjectId, required: true, ref: "Service" },
	serviceName: { type: String, required: true },
	servicePrice: { type: Number, required: true },
});

export const AppointmentServiceModel = mongoose.model<
	IAppointmentService,
	AppointmentServiceModelType
>("AppointmentService", AppointmentServiceSchema);
