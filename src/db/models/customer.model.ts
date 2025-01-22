import { IAccount } from "@db/models/account.model";
import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface ICustomer {
	account: IAccount;
	fName: string;
	lName: string;
	avt?: string;
	address: Array<string>;
	dob: Date;
}
export type CustomerDocumentType = HydratedDocument<ICustomer>;
export type CustomerModelType = Model<
	ICustomer,
	{},
	{},
	{},
	CustomerDocumentType
>;

const customerSchema = new Schema<ICustomer, CustomerModelType>({
	account: { type: Schema.Types.ObjectId, ref: "Account", required: true },
	fName: { type: String, required: true },
	lName: { type: String, required: true },
	avt: { type: String, required: false },
	address: { type: [String], required: true },
	dob: { type: Date, required: true },
});
export const CustomerModel = mongoose.model<ICustomer, CustomerModelType>(
	"Customer",
	customerSchema,
);
