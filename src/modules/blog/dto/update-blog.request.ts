import { PartialType } from "@nestjs/mapped-types";
import { CreateBlogRequest } from "./create-blog.request";

export class UpdateBlogRequest extends PartialType(CreateBlogRequest) {}
