import { AccountDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";
import { AccounStatusEnum, AccountRoleEnum } from "@utils";

export class AccountResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	phone: string;

	@ApiProperty()
	role: AccountRoleEnum;
	@ApiProperty()
	status: AccounStatusEnum;
	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	@ApiProperty()
	fName: string;

	@ApiProperty()
	lName: string;

	@ApiProperty()
	dob?: string;

	@ApiProperty()
	avt?: string;

	static fromDocument(d: AccountDocumentType): AccountResponse {
		return {
			id: d._id.toString(),
			email: d.email,
			fName: d.fName,
			lName: d.lName,
			phone: d.phone,
			role: d.role,
			status: d.status,
			avt: d.avt,
			dob: d.dob,
			createdAt: d.createdAt,
			updatedAt: d.updatedAt,
		};
	}

	static fromDocuments(d: AccountDocumentType[]) {
		return d.map(this.fromDocument);
	}
}
