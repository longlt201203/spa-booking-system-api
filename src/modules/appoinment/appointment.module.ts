import { AppointmentModel } from "@db/models";
import { AccountModule } from "@modules/account";
import { AppointmentController } from "@modules/appoinment/appointment.controller";
import { AppointmentService } from "@modules/appoinment/appointment.service";
import { ServiceModule } from "@modules/service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "Appointment", schema: AppointmentModel.schema },
		]),
		AccountModule,
		ServiceModule,
	],
	exports: [
		MongooseModule.forFeature([
			{ name: "Appointment", schema: AppointmentModel.schema },
		]),
	],
	providers: [AppointmentService],
	controllers: [AppointmentController],
})
export class AppointmentModule {}
