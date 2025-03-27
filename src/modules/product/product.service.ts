import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductRequest } from "./dto/create-product.request";
import { UpdateProductRequest } from "./dto/update-product.request";
import { ProductDocumentType } from "@db/models/product.model";

@Injectable()
export class ProductService {
	constructor(
		@InjectModel("Product")
		private readonly productModel: Model<ProductDocumentType>,
	) {}

	async create(createProductDto: CreateProductRequest) {
		const newProduct = new this.productModel(createProductDto);
		return await newProduct.save();
	}

	async update(id: string, updateProductDto: UpdateProductRequest) {
		return await this.productModel.findByIdAndUpdate(id, updateProductDto, {
			new: true,
		});
	}

	async remove(id: string) {
		return await this.productModel.findByIdAndDelete(id);
	}

	async getById(id: string) {
		return await this.productModel.findById(id);
	}

	async getAll() {
		return await this.productModel.find();
	}
}
