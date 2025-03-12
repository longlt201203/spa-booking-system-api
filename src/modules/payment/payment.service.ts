import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import {
	AppointmentDocumentType,
	AppointmentModel,
	AppointmentModelType,
	PaymentDocumentType,
	PaymentModel,
} from "@db/models";
import { CreatePaymentRequest, PaymentResponse } from "@modules/payment/dto";
import { AppointmentStatusEnum, PaymentStatusEnum } from "@utils";
import * as crypto from "crypto";
const PayOS = require("@payos/node");

@Injectable()
export class PaymentService {
	private payos: any;
	constructor(
		@InjectModel("Payment")
		private readonly paymentModel: Model<PaymentDocumentType>,
		@InjectModel("Appointment")
		private readonly appointmentModel: Model<AppointmentModelType>,
	) {
		console.log("PAYOS_CLIENT_ID:", process.env.PAYOS_CLIENT_ID);
		console.log("PAYOS_API_KEY:", process.env.PAYOS_API_KEY);
		console.log("PAYOS_CHECKSUM_KEY:", process.env.PAYOS_CHECKSUM_KEY);
		this.payos = new PayOS(
			process.env.PAYOS_CLIENT_ID,
			process.env.PAYOS_API_KEY,
			process.env.PAYOS_CHECKSUM_KEY,
		);
	}

	async createPayment(createPaymentDto: CreatePaymentRequest): Promise<string> {
		const { totalAmount, method, appointmentId } = createPaymentDto;
		console.log("Database:", this.appointmentModel.db.name);
		console.log("Collection:", this.appointmentModel.collection.name);
		const orderCode = Math.floor(100000 + Math.random() * 900000);

		if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
			throw new Error("appointmentId không hợp lệ");
		}
		const appointment = (await this.appointmentModel.findById(
			appointmentId,
		)) as AppointmentDocumentType;
		console.log("Appointment :", appointment);
		if (!appointment) {
			throw new Error("Không tìm thấy cuộc hẹn");
		}

		appointment.status = AppointmentStatusEnum.FINISHED;
		appointment.updatedAt = new Date();
		await appointment.save();

		const payment = new this.paymentModel({
			amount: totalAmount,
			appointment: appointmentId,
			method: method,
			status: PaymentStatusEnum.PENDING,
			orderCode: orderCode,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await payment.save();
		const paymentData = {
			clientId: process.env.PAYOS_CLIENT_ID,
			orderCode: orderCode,
			amount: totalAmount,
			description: `Thanh toán cho đơn hàng #${orderCode}`.slice(0, 25),
			returnUrl: process.env.PAYOS_RETURN_URL,
			cancelUrl: process.env.PAYOS_CANCEL_URL,
		};

		const checksum = crypto
			.createHmac("sha256", process.env.PAYOS_CHECKSUM_KEY)
			.update(
				Object.keys(paymentData)
					.sort()
					.map((key) => `${key}=${paymentData[key]}`)
					.join("&"),
			)
			.digest("hex");

		try {
			const response = await this.payos.createPaymentLink(paymentData);
			if (response && response.checkoutUrl) {
				return response.checkoutUrl;
			}
			throw new Error("Không thể tạo link thanh toán");
		} catch (error) {
			throw new Error(`Lỗi khi tạo link thanh toán: ${error.message}`);
		}
	}

	async handlePaymentWebhook(
		body: any,
		signature: string,
	): Promise<PaymentResponse> {
		const { orderCode, amount } = body.data;

		const payment = await this.paymentModel.findOne({ orderCode });
		if (!payment) {
			throw new Error("Không tìm thấy thanh toán!");
		}

		payment.status = PaymentStatusEnum.SUCCESS;
		payment.amountPaid = amount;
		payment.updatedAt = new Date();
		await payment.save();

		return {
			orderCode,
			status: PaymentStatusEnum.SUCCESS,
			amount: amount,
		};
	}
}
