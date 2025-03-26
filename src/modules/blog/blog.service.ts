import { BlogDocumentType } from "@db/models";
import { CreateBlogRequest, UpdateBlogRequest } from "@modules/blog/dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class BlogService {
	constructor(
		@InjectModel("Blog")
		private readonly blogModel: Model<BlogDocumentType>,
	) {}

	async create(createBlogDto: CreateBlogRequest) {
		const newBlog = new this.blogModel(createBlogDto);
		return await newBlog.save();
	}

	async update(id: string, updateBlogDto: UpdateBlogRequest) {
		return await this.blogModel.findByIdAndUpdate(id, updateBlogDto, {
			new: true,
		});
	}

	async remove(id: string) {
		return await this.blogModel.findByIdAndDelete(id);
	}

	async getById(id: string) {
		return await this.blogModel.findById(id);
	}

	async getAll() {
		return await this.blogModel.find();
	}
}
