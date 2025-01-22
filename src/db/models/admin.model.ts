import { IAccount } from "@db/models/account.model";
import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IAdmin {
	account: IAccount;
	fName: string;
	lName: string;
	avt?: string;
}
export type AccountDocumentType = HydratedDocument<IAccount>;
export type AdminModelType = Model<IAdmin, {}, {}, {}, AccountDocumentType>;
const adminSchema = new Schema<IAdmin, AdminModelType>({
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
export const AdminModel = mongoose.model<IAdmin, AdminModelType>(
	"Admin",
	adminSchema,
);
