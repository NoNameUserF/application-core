import { secondNumberValueList } from "../helpers/commonUtilsHelpers";

export const validateEmail = (email: string) => {
    if (!email.length) {
        return ""
    }
    if (email.length > 254) {
        return "Слишком длинная почта";
    }
    if (email) {
        if (!/^[0-9A-Za-z@._-]+$/.test(email)) {
            return "Введите корректный email";
        }

        if (!/^[\w.-]+@([\w-]+\.)+[\w-]+$/.test(email)) {
            return "Введите корректный email";
        }
    }

    return "";
};

export const validateName = (name: string) => {

    if (!name.trim().length) {
        return "Слишком короткое имя";
    }
    if (name.length > 50) {
        return "Слишком длинное имя ";
    }

    const validateNames = /^[A-Za-zА-Яа-я'\s-]+$/;
    if (!validateNames.test(name.trim())) {
        return "Введите корректное имя";
    }

    return "";
};

export const validateDescription = (text: string) => {
    if (!text.trim().length) {
        return "Введите сообщение";
    }
    if (text.length > 2000) {
        return "Слишком длинное сообщение";
    }

    return "";
};

export const formatTime = (seconds: number) => {
	if (seconds < 0) {
		seconds = 0;
	}

	const hours = Math.floor(seconds / secondNumberValueList.oneHourSeconds);
	const minutes = Math.floor((seconds % secondNumberValueList.oneHourSeconds) / secondNumberValueList.oneMinuteSeconds);
	const remainingSeconds = seconds % secondNumberValueList.oneMinuteSeconds;

	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(remainingSeconds).padStart(2, "0");

	if (hours > 0) {
		const formattedHours = String(hours).padStart(2, "0");
		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	} else {
		return `${formattedMinutes}:${formattedSeconds}`;
	}
};
