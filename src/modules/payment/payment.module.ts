import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentController } from "@modules/payment/payment.controller";
import { PaymentService } from "@modules/payment/payment.service";
import { PaymentModel } from "@db/models";
import { AppointmentModule } from "@modules/appoinment";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "Payment", schema: PaymentModel.schema },
		]),
		AppointmentModule,
	],
	exports: [
		MongooseModule.forFeature([
			{ name: "Payment", schema: PaymentModel.schema },
		]),
	],

	providers: [PaymentService],
	controllers: [PaymentController],
})
export class PaymentModule {}
