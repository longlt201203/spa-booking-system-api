import { CreateSpaRequest } from "@modules/spa/dto/create-spa.request";
import { PartialType } from "@nestjs/swagger";

export class UpdateSpaRequest extends PartialType(CreateSpaRequest) {}
