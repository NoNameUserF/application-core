export const storeDataToStorage = (key: string, item: object | string | number | boolean) => {
	window.localStorage.setItem(key, JSON.stringify(item));
};

export const getDataFromStorage = (key: string) => {
	const result = window.localStorage.getItem(key);
	if (result) {
		return JSON.parse(result);
	}

	return null;
};

export const removeDataFromStorage = (key: string) => {
	window.localStorage.removeItem(key);
};
