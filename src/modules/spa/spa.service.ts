import { Injectable } from "@nestjs/common";
import { SpaModel } from "@db/models";
import { CreateSpaRequest, UpdateSpaRequest } from "@modules/spa/dto";

@Injectable()
export class SpaService {
	async createOne(dto: CreateSpaRequest) {
		const spa = new SpaModel(dto);
		return await spa.save();
	}

	async getAll() {
		return await SpaModel.find();
	}

	async getById(id: string) {
		return await SpaModel.findById(id);
	}

	async updateById(id: string, dto: UpdateSpaRequest) {
		return await SpaModel.findByIdAndUpdate(id, dto, { new: true });
	}

	async deleteById(id: string) {
		return await SpaModel.findByIdAndDelete(id);
	}
}
