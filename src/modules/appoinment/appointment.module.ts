import { AppointmentModel } from "@db/models";
import { AppointmentController } from "@modules/appoinment/appointment.controller";
import { AppointmentService } from "@modules/appoinment/appointment.service";
import { SpaModule } from "@modules/spa";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "Appointment", schema: AppointmentModel.schema },
		]),
		SpaModule,
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
