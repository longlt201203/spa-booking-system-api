import { ApiProperty } from "@nestjs/swagger";
import { AccountRoleEnum } from "@utils";
import {
	IsDate,
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	IsStrongPassword,
} from "class-validator";

export class CreateAccountRequest {
	@ApiProperty({ example: "example@mail.com" })
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	phone: string;

	@ApiProperty({ example: "Str@123" })
	@IsStrongPassword({
		minLength: 6,
		minLowercase: 1,
		minNumbers: 1,
		minSymbols: 1,
		minUppercase: 1,
	})
	password: string;

	@ApiProperty()
	@IsEnum(AccountRoleEnum)
	role: AccountRoleEnum;

	@ApiProperty()
	@IsDate()
	createdAt: Date;

	@ApiProperty()
	@IsDate()
	updatedAt: Date;

	@ApiProperty()
	@IsString()
	fName: string;

	@ApiProperty()
	@IsString()
	lName: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	dob?: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	avt?: string;
}
