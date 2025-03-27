import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { Env, MyExceptionFilter, ValidationPipe } from "@utils";
import { CategoryModule } from "@modules/category";
import { SpaModule } from "@modules/spa";
import { ServiceModule } from "@modules/service";
import { FeedbackModule } from "@modules/feedback";
import { AccountModule } from "@modules/account";
import { ClsModule } from "nestjs-cls";
import { AuthGuard, AuthModule } from "@modules/auth";
import { PaymentModule } from "@modules/payment";
import { MongooseModule } from "@nestjs/mongoose";
import { AppointmentModule } from "@modules/appoinment";
import { BlogModule } from "@modules/blog";
import { PromotionModule } from "@modules/promotion/promotion.module";
import { TotalPaymentModule } from "@modules/total-payment";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
	imports: [
		ServeStaticModule.forRoot({ rootPath: path.join(process.cwd(), "public") }),
		MongooseModule.forRoot(
			`mongodb://${Env.DB_HOST}:${Env.DB_PORT}/${Env.DB_NAME}`,
		),
		ClsModule.forRoot({ global: true, middleware: { mount: true } }),
		CategoryModule,
		SpaModule,
		ServiceModule,
		BlogModule,
		FeedbackModule,
		AccountModule,
		AuthModule,
		AppointmentModule,
		PaymentModule,
		PromotionModule,
		TotalPaymentModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{ provide: APP_FILTER, useClass: MyExceptionFilter },
		{ provide: APP_PIPE, useClass: ValidationPipe },
		{ provide: APP_GUARD, useClass: AuthGuard },
	],
})
export class AppModule {}
