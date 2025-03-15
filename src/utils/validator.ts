import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "isValidTime", async: false })
export class TimeValidator implements ValidatorConstraintInterface {
	validate(time: string, args: ValidationArguments) {
		const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
		if (!timeRegex.test(time)) {
			return false;
		}

		const [hour, minute] = time.split(":").map(Number);
		const totalMinutes = hour * 60 + minute;
		const startMinutes = 8 * 60; // 08:00 = 480 phút
		const endMinutes = 20 * 60; // 20:00 = 1200 phút

		return totalMinutes >= startMinutes && totalMinutes <= endMinutes;
	}

	defaultMessage(args: ValidationArguments) {
		return "Thời gian phải nằm trong khoảng từ 08:00 đến 20:00 và có định dạng HH:MM";
	}
}
