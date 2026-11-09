import { getDataFromStorage, storeDataToStorage } from "../../../utils/localStorageUtils";

const getLocalStorageNavbarStateKey = (appName: string) => {
	return `${appName}_desktop_navbar_state`;
};

export const getLocalStorageNavbarStateValue = (appName: string) => {
	const key = getLocalStorageNavbarStateKey(appName);
	if (key) {
		const value = getDataFromStorage(key);
		if (value) {
			return value;
		}
		return "open";
	}
	return "open";
};

export const setLocalStorageNavbarStataValue = (appName: string, value: string) => {
	storeDataToStorage(getLocalStorageNavbarStateKey(appName), value);
};
