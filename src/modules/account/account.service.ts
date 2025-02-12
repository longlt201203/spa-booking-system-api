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
		const account = await AccountModel.findByIdAndUpdate(
			id,
			{
				...dto,
				password: await bcrypt.hash(dto.password, 10),
			},
			{
				new: true,
			},
		);
		if (!account) throw new NotFoundException("Account not found!");
		return account;
	}

	async findMany(query: AccountQuery) {
		return await AccountModel.find();
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
