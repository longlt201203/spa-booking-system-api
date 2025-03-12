import * as crypto from "crypto";
import axios from "axios";

const PAYOS_API_KEY = process.env.PAYOS_API_KEY as string;
const PAYOS_CLIENT_ID = process.env.PAYOS_CLIENT_ID as string;
const PAYOS_CHECKSUM_KEY = process.env.PAYOS_CHECKSUM_KEY as string;
const PAYOS_RETURN_URL = process.env.PAYOS_RETURN_URL as string;
const PAYOS_CANCEL_URL = process.env.PAYOS_CANCEL_URL as string;

export const createPaymentLink = async (
	orderCode: string,
	totalAmount: number,
): Promise<string> => {
	const paymentData = {
		clientId: PAYOS_CLIENT_ID,
		orderCode: orderCode,
		amount: totalAmount,
		description: `Thanh toán cho đơn hàng #${orderCode}`,
		returnUrl: PAYOS_RETURN_URL,
		cancelUrl: PAYOS_CANCEL_URL,
	};

	const checksum = crypto
		.createHmac("sha256", PAYOS_CHECKSUM_KEY)
		.update(
			Object.keys(paymentData)
				.sort()
				.map((key) => `${key}=${paymentData[key]}`)
				.join("&"),
		)
		.digest("hex");

	const response = await axios.post(
		"https://payos-api-link/create-payment",
		{
			...paymentData,
		},
		{
			headers: { Authorization: `Bearer ${PAYOS_API_KEY}` },
		},
	);

	return response.data.checkoutUrl;
};

export const verifySignature = (data: any, signature: string): boolean => {
	try {
		const sortedData = Object.keys(data)
			.sort()
			.map((key) => `${key}=${data[key]}`)
			.join("&");

		const computedSignature = crypto
			.createHmac("sha256", PAYOS_CHECKSUM_KEY)
			.update(sortedData)
			.digest("hex");

		return computedSignature === signature;
	} catch (error) {
		console.error("Lỗi khi kiểm tra chữ ký:", error);
		return false;
	}
};
