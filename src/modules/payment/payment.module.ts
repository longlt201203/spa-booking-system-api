import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentController } from "@modules/payment/payment.controller";
import { PaymentService } from "@modules/payment/payment.service";
import { PaymentModel, AppointmentModel } from "@db/models";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: PaymentModel.name, schema: PaymentModel.schema },
			{ name: AppointmentModel.name, schema: AppointmentModel.schema },
		]),
	],
	providers: [PaymentService],
	controllers: [PaymentController],
})
export class PaymentModule {}
