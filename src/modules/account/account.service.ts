import { Injectable, NotFoundException } from "@nestjs/common";
import {
	CreateAccountRequest,
	UpdateAccountRequest,
	AccountQuery,
} from "./dto";
import { AccountModel } from "@db/models";
import * as bcrypt from "bcrypt";

@Injectable()
export class AccountService {
	async createOne(dto: CreateAccountRequest) {
		const account = new AccountModel({
			...dto,
			password: await bcrypt.hash(dto.password, 10),
		});
		return await account.save();
	}

	async updateOne(id: string, dto: UpdateAccountRequest) {
		const updateData: any = { ...dto };
		if (dto.password) {
			updateData.password = await bcrypt.hash(dto.password, 10);
		}
		const account = await AccountModel.findByIdAndUpdate(id, updateData, {
			new: true,
		});
		if (!account) throw new NotFoundException("Account not found!");
		return account;
	}
	async findMany(query: AccountQuery) {
		const filter: any = {};
		if (query.role !== undefined) {
			filter.role = query.role;
		}
		return await AccountModel.find(filter);
	}

	async findOne(id: string) {
		const account = await AccountModel.findById(id);
		if (!account) throw new NotFoundException("Account not found!");
		return account;
	}

	async deleteOne(id: string) {
		const account = await AccountModel.findByIdAndDelete(id);
		if (!account) throw new NotFoundException("Account not found!");
		return account;
	}
}
