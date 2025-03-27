import { ApiProperty } from "@nestjs/swagger";

export class ProductResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	quantity: number;

	@ApiProperty()
	description: string;

	@ApiProperty()
	price: number;

	@ApiProperty({ required: false })
	promotion?: string;

	@ApiProperty()
	category: string;

	@ApiProperty()
	image: string; // Thêm thuộc tính image

	@ApiProperty()
	stock: number; // Thêm thuộc tính stock
}
