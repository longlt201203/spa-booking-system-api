import {
	CreateProductRequest,
	UpdateProductRequest,
} from "@modules/product/dto";
import { ProductService } from "@modules/product/product.service";
import {
	Controller,
	Post,
	Body,
	Put,
	Param,
	Delete,
	Get,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("products")
@ApiBearerAuth()
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	async create(@Body() createProductDto: CreateProductRequest) {
		return this.productService.create(createProductDto);
	}

	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateProductDto: UpdateProductRequest,
	) {
		return this.productService.update(id, updateProductDto);
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return this.productService.remove(id);
	}

	@Get(":id")
	async getById(@Param("id") id: string) {
		return this.productService.getById(id);
	}

	@Get()
	async getAll() {
		return this.productService.getAll();
	}
}
