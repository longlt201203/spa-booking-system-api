import mongoose, {
	HydratedDocument,
	Model,
	ObjectId,
	Schema,
	Types,
} from "mongoose";

export interface ISpaSlot {
	startTime: string;
	endTime: string;
}

export interface ISpa {
	name: string;
	spaOwner: ObjectId;
	email: string;
	phone: string;
	description: string;
	logo: string;
	images: string[];
	address: string;
	createdAt: Date;
	updatedAt: Date;
	slots: ISpaSlot[];
}

export type SpaDocumentType = HydratedDocument<
	ISpa,
	{
		slots: Types.DocumentArray<ISpaSlot>;
	}
>;

export type SpaModelType = Model<ISpa, {}, {}, {}, SpaDocumentType>;

const SpaSlotSchema = new Schema<ISpaSlot>({
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
});

const SpaSchema = new Schema<ISpa, SpaModelType>({
	name: { type: String, required: true },
	spaOwner: { type: Schema.Types.ObjectId, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	description: { type: String, required: true },
	logo: { type: String, required: true },
	images: { type: [String], required: true },
	address: { type: String, required: true },
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
	slots: [SpaSlotSchema],
});

export const SpaModel = mongoose.model<ISpa, SpaModelType>("Spa", SpaSchema);
