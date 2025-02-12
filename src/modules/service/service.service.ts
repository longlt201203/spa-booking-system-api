import { Injectable } from "@nestjs/common";
import { ServiceModel } from "@db/models";
import {
	CreateServiceRequest,
	UpdateServiceRequest,
} from "@modules/service/dto";

@Injectable()
export class ServiceService {
	async createOne(dto: CreateServiceRequest) {
		const service = new ServiceModel(dto);
		return await service.save();
	}

	async getAll() {
		return ServiceModel.find();
	}

	async getById(id: string) {
		return ServiceModel.findById(id);
	}

	async updateById(id: string, dto: UpdateServiceRequest) {
		return await ServiceModel.findByIdAndUpdate(id, dto, { new: true });
	}

	async deleteById(id: string) {
		return await ServiceModel.findByIdAndDelete(id);
	}
}
