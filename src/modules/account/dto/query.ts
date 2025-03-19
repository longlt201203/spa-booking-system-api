import { ApiProperty } from "@nestjs/swagger";
import { AccountRoleEnum } from "@utils";
import { IsEnum, IsOptional } from "class-validator";

export class AccountQuery {
	@ApiProperty({ enum: AccountRoleEnum, required: false })
	@IsEnum(AccountRoleEnum)
	@IsOptional()
	role?: AccountRoleEnum;
}
