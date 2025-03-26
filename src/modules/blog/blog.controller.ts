import { BlogService } from "@modules/blog/blog.service";
import { CreateBlogRequest, UpdateBlogRequest } from "@modules/blog/dto";
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

@Controller("blogs")
@ApiBearerAuth()
export class BlogController {
	constructor(private readonly blogService: BlogService) {}

	@Post()
	async create(@Body() createBlogDto: CreateBlogRequest) {
		return this.blogService.create(createBlogDto);
	}

	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateBlogDto: UpdateBlogRequest,
	) {
		return this.blogService.update(id, updateBlogDto);
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return this.blogService.remove(id);
	}

	@Get(":id")
	async getById(@Param("id") id: string) {
		return this.blogService.getById(id);
	}

	@Get()
	async getAll() {
		return this.blogService.getAll();
	}
}
