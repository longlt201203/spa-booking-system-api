import { AccountResponse } from "@modules/account/dto";
import { ClsStore } from "nestjs-cls";

export interface SbsClsStore extends ClsStore {
	account: AccountResponse;
}
