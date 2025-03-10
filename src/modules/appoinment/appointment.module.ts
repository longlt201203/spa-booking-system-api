import { AppointmentModel, AppointmentServiceModel } from "@db/models";
import { AppointmentController } from "@modules/appoinment/appointment.controller";
import { AppointmentService } from "@modules/appoinment/appointment.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "Appointment", schema: AppointmentModel.schema },
			{ name: "AppointmentService", schema: AppointmentServiceModel.schema },
		]),
	],
	controllers: [AppointmentController],
	providers: [AppointmentService],
})
export class AppointmentModule {}
