import { CreateServiceRequest } from "@modules/service/dto/create-service.request";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateServiceRequest extends PartialType(CreateServiceRequest) {}
