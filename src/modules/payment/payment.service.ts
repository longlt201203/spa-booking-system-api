import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
import { Types } from "mongoose";
const PayOS = require("@payos/node");

@Injectable()
export class PaymentService {
	private payos: any;
	constructor(
		@InjectModel(PaymentModel.name)
		private readonly paymentModel: Model<PaymentDocumentType>,
		@InjectModel(AppointmentModel.name)
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
		const appointment = (await this.appointmentModel.findById(
			new Types.ObjectId(appointmentId),
		)) as AppointmentDocumentType;
		console.log("appointment:", appointment);
		const orderCode = Math.floor(100000 + Math.random() * 900000);
		if (!appointment) {
			throw new Error("Không tìm thấy cuộc hẹn");
		}

		appointment.status = AppointmentStatusEnum.FINISHED;
		appointment.updatedAt = new Date();
		await appointment.save();

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
		data: any,
		signature: string,
	): Promise<PaymentResponse> {
		const isValid = this.verifySignature(data, signature);
		if (!isValid) {
			throw new Error("Chữ ký không hợp lệ!");
		}

		const { orderCode, amount, transactionId, counterAccountName } = data;

		const payment = await this.paymentModel.findOne({ orderCode });
		if (!payment) {
			throw new Error("Không tìm thấy thanh toán!");
		}

		payment.status = PaymentStatusEnum.SUCCESS;
		payment.amountPaid = amount;
		payment.payerName = counterAccountName;
		payment.payosTransactionId = transactionId;
		payment.updatedAt = new Date();
		await payment.save();

		return {
			orderCode,
			status: PaymentStatusEnum.SUCCESS,
			amountPaid: amount,
			payerName: counterAccountName,
			payosTransactionId: transactionId,
		};
	}

	private verifySignature(data: any, signature: string): boolean {
		try {
			const sortedData = Object.keys(data)
				.sort()
				.map((key) => `${key}=${data[key]}`)
				.join("&");

			const computedSignature = crypto
				.createHmac("sha256", process.env.PAYOS_CHECKSUM_KEY)
				.update(sortedData)
				.digest("hex");

			return computedSignature === signature;
		} catch (error) {
			console.error("Lỗi khi kiểm tra chữ ký:", error);
			return false;
		}
	}
}
