import { IAccount } from "@db/models/account.model";
import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface ISpaStaff {
	account: IAccount;
	spaId: ISpa;
	fName: string;
	lName: string;
	avt?: string;
}
export type AccountDocumentType = HydratedDocument<IAccount>;

export type SpaStaffModelType = Model<
	ISpaStaff,
	{},
	{},
	{},
	AccountDocumentType
>;
const spaStaffSchema = new Schema<ISpaStaff, SpaStaffModelType>({
	account: {
		type: Schema.Types.ObjectId,
		ref: "Account",
		required: true,
		unique: true,
	},
	spaId: { type: Schema.Types.ObjectId, ref: "Spa", required: true },
	fName: { type: String, required: true },
	lName: { type: String, required: true },
	avt: { type: String, required: false },
});
export const SpaStaffModel = mongoose.model<ISpaStaff, SpaStaffModelType>(
	"SpaStaff",
	spaStaffSchema,
);
