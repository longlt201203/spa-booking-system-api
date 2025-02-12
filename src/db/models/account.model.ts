import { AccountRoleEnum } from "@utils";
import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IAccount {
	email: string;
	phone: string;
	password: string;
	role: AccountRoleEnum;
	createdAt: Date;
	updatedAt: Date;
	fName: string;
	lName: string;
	dob?: string;
	avt?: string;
}

export type AccountDocumentType = HydratedDocument<IAccount>;

export type AccountModelType = Model<IAccount, {}, {}, {}, AccountDocumentType>;

const AccountSchema = new Schema<IAccount, AccountModelType>({
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: {
		type: Number,
		enum: AccountRoleEnum,
		default: AccountRoleEnum.CUSTOMER,
	},
	avt: { type: String, required: false },
	fName: { type: String, required: true },
	lName: { type: String, required: true },
	dob: { type: String, required: false },
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
});

export const AccountModel = mongoose.model<IAccount, AccountModelType>(
	"Account",
	AccountSchema,
);
