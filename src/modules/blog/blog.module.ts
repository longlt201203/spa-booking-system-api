import { BlogModel } from "@db/models";
import { BlogController } from "@modules/blog/blog.controller";
import { BlogService } from "@modules/blog/blog.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "Blog", schema: BlogModel.schema }]),
	],
	providers: [BlogService],
	controllers: [BlogController],
	exports: [
		MongooseModule.forFeature([{ name: "Blog", schema: BlogModel.schema }]),
	],
})
export class BlogModule {}
