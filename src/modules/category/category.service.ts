import { Injectable } from "@nestjs/common";
import { CreateCategoryRequest, UpdateCategoryRequest } from "./dto";
import { CategoryModel } from "@db/models";

@Injectable()
export class CategoryService {
	async createOne(dto: CreateCategoryRequest) {
		const category = new CategoryModel(dto);
		return await category.save();
	}

	async getAll() {
		return CategoryModel.find();
	}

	async getById(id: string) {
		return CategoryModel.findById(id);
	}

	async updateById(id: string, dto: UpdateCategoryRequest) {
		return await CategoryModel.findByIdAndUpdate(id, dto, { new: true });
	}

	async deleteById(id: string) {
		return await CategoryModel.findByIdAndDelete(id);
	}
}
