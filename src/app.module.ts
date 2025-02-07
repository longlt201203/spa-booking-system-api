import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { MyExceptionFilter, ValidationPipe } from "@utils";
import { CategoryModule } from "@modules/category";
import { SpaModule } from "@modules/spa/spa.module";
import { ServiceModule } from "@modules/service/service.module";
import { FeedbackModule } from "@modules/feedback/feedback.module";

@Module({
	imports: [CategoryModule, SpaModule, ServiceModule, FeedbackModule],
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
	],
})
export class AppModule {}
