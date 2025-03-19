import { ApiProperty } from "@nestjs/swagger";

import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	IsStrongPassword,
} from "class-validator";
import { AccounStatusEnum, AccountRoleEnum } from "@utils";

export class UpdateAccountRequest {
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
	@ApiProperty({ enum: AccounStatusEnum, required: false })
	@IsEnum(AccounStatusEnum)
	@IsOptional()
	status?: AccounStatusEnum;
}
