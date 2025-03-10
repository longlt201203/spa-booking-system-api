import { AppointmentService } from "@modules/appoinment/appointment.service";
import { CreateAppointmentRequest } from "@modules/appoinment/dto/create-appointment.request";
import { UpdateAppointmentRequest } from "@modules/appoinment/dto/update-appointment.request";
import {
	Controller,
	Post,
	Body,
	Put,
	Param,
	Delete,
	Get,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("appointments")
@ApiBearerAuth()
export class AppointmentController {
	constructor(private readonly appointmentService: AppointmentService) {}

	@Post()
	async create(@Body() createAppointmentDto: CreateAppointmentRequest) {
		return this.appointmentService.create(createAppointmentDto);
	}

	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateAppointmentDto: UpdateAppointmentRequest,
	) {
		return this.appointmentService.update(id, updateAppointmentDto);
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return this.appointmentService.remove(id);
	}

	@Get(":id")
	async getById(@Param("id") id: string) {
		return this.appointmentService.getById(id);
	}
}
