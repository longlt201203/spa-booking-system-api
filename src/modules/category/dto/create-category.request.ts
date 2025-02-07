import { ICategory } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryRequest implements ICategory {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;
}
