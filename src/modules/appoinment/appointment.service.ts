import {
	AccountModel,
	AppointmentDocumentType,
	AppointmentModel,
} from "@db/models";
import { AppointmentResponse } from "@modules/appoinment/dto";
import { CreateAppointmentRequest } from "@modules/appoinment/dto/create-appointment.request";
import { UpdateAppointmentRequest } from "@modules/appoinment/dto/update-appointment.request";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AppointmentService {
	constructor(
		@InjectModel("Appointment")
		private readonly appointmentModel: Model<AppointmentDocumentType>,
	) {}

	async create(createAppointmentDto: CreateAppointmentRequest) {
		const newAppointment = new this.appointmentModel(createAppointmentDto);
		return await newAppointment.save();
	}

	async update(id: string, updateAppointmentDto: UpdateAppointmentRequest) {
		return await this.appointmentModel.findByIdAndUpdate(
			id,
			updateAppointmentDto,
			{ new: true },
		);
	}

	async remove(id: string) {
		return await this.appointmentModel.findByIdAndDelete(id);
	}

	async getById(id: string) {
		return await this.appointmentModel.findById(id);
	}
	async getAll() {
		return await AppointmentModel.find();
	}
}
