import { Injectable } from "@nestjs/common";
import { LoginRequest, RegisterRequest, TokenResponse } from "./dto";
import { Env, SbsClsStore } from "@utils";
import { WrongUsernameOrPasswordError } from "./errors";
import { AccountModel } from "@db/models";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ClsService } from "nestjs-cls";

@Injectable()
export class AuthService {
	constructor(private readonly cls: ClsService<SbsClsStore>) {}

	getProfileCls() {
		return this.cls.get("account");
	}

	signTokens(accountId: string): TokenResponse {
		const accessToken = jwt.sign({}, Env.AT_SECRET, {
			subject: accountId,
			issuer: Env.APP_DOMAIN,
			expiresIn: Env.AT_EXPIRES_IN,
		});

		return { accessToken };
	}

	verifyAccessToken(token: string) {
		const data = jwt.verify(token, Env.AT_SECRET, {
			issuer: Env.APP_DOMAIN,
		});
		return typeof data == "string" ? null : data.sub;
	}

	async login(dto: LoginRequest) {
		const { email, password } = dto;
		if (!(email && password)) throw new WrongUsernameOrPasswordError();
		const account = await AccountModel.findOne({ email: email });
		if (!account) throw new WrongUsernameOrPasswordError();
		if (!bcrypt.compareSync(password, account.password))
			throw new WrongUsernameOrPasswordError();
		return this.signTokens(account.id);
	}

	async register(dto: RegisterRequest) {
		const account = new AccountModel({
			...dto,
			password: await bcrypt.hash(dto.password, 10),
		});
		return account.save();
	}

	async updateProfile(dto: RegisterRequest) {
		const accountId = this.cls.get("account.id");
		return await AccountModel.findByIdAndUpdate(
			accountId,
			{
				...dto,
				password: await bcrypt.hash(dto.password, 10),
			},
			{ new: true },
		);
	}
}
