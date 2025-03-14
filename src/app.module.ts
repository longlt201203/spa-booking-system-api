import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { MyExceptionFilter, ValidationPipe } from "@utils";
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

@Module({
	imports: [
		MongooseModule.forRoot("mongodb://localhost:27017/kitswd"),
		ClsModule.forRoot({
			global: true,
			middleware: {
				mount: true,
			},
		}),
		CategoryModule,
		SpaModule,
		ServiceModule,
		FeedbackModule,
		AccountModule,
		AuthModule,
		AppointmentModule,
		PaymentModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: MyExceptionFilter,
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
