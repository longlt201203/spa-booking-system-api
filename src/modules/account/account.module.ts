// account.module.ts
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { AccountModel } from "@db/models";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "Account", schema: AccountModel.schema },
		]),
	],
	exports: [
		MongooseModule.forFeature([
			{ name: "Account", schema: AccountModel.schema },
		]),
	],

	providers: [AccountService],

	controllers: [AccountController],
})
export class AccountModule {}
