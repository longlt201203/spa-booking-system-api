import { AccountDocumentType, IAccount } from "@db/models/account.model";
import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IAdmin {
	account: AccountDocumentType;
	fName: string;
	lName: string;
	avt?: string;
}
export type AdmintDocumentType = HydratedDocument<IAdmin>;
export type AdminModelType = Model<IAdmin, {}, {}, {}, AdmintDocumentType>;
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
