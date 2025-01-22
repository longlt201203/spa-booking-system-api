import { IAccount } from "@db/models/account.model";
import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface ISpaOwner {
	account: IAccount;
	fName: string;
	lName: string;
	avt?: string;
}
export type AccountDocumentType = HydratedDocument<IAccount>;
export type SpaOwnerModelType = Model<
	ISpaOwner,
	{},
	{},
	{},
	AccountDocumentType
>;
const spaOwnerSchema = new Schema<ISpaOwner, SpaOwnerModelType>({
	account: {
		type: Schema.Types.ObjectId,
		ref: "Account",
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
