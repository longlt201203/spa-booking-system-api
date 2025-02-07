import { SpaDocumentType } from "@db/models/spa-staff.model";
import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface ISpaOwner {
	spa: SpaDocumentType;
	fName: string;
	lName: string;
	avt?: string;
}
export type SpaOwnerDocumentType = HydratedDocument<ISpaOwner>;
export type SpaOwnerModelType = Model<
	ISpaOwner,
	{},
	{},
	{},
	SpaOwnerDocumentType
>;
const spaOwnerSchema = new Schema<ISpaOwner, SpaOwnerModelType>({
	spa: {
		type: Schema.Types.ObjectId,
		ref: "Spa",
		required: true,
		unique: true,
	},
	fName: { type: String, required: true },
	lName: { type: String, required: true },
	avt: { type: String, required: false },
});
export const SpaOwnerModel = mongoose.model<ISpaOwner, SpaOwnerModelType>(
	"SpaOwner",
	spaOwnerSchema,
);
