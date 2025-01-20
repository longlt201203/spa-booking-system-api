import mongoose, { HydratedDocument, Model, ObjectId, Schema } from "mongoose";

export interface IService {
	name: string;
	description: string;
	price: number;
	categories: ObjectId[];
}

export type ServiceDocumentType = HydratedDocument<IService>;

export type ServiceModelType = Model<IService, {}, {}, {}, ServiceDocumentType>;

const ServiceSchema = new Schema<IService, ServiceModelType>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	categories: { type: [Schema.Types.ObjectId], required: true },
});

export const ServiceModel = mongoose.model<IService, ServiceModelType>(
	"Service",
	ServiceSchema,
);
