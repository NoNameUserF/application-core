export const fetchPost = async (host: string, link: string, body: object): Promise<unknown> => {
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept-Language": "ru-RU",
		},
		body: JSON.stringify(body),
	};

	const response = await fetch(host + link, requestOptions);
	if (!response.ok) {
		throw {
			status: response.status,
			link: link,
		};
	}
	return await response.json();
};

export const fetchImagePost = async (host: string, link: string, file: File, text: string): Promise<unknown> => {
	const formData = new FormData();
	formData.set("file", file);
	formData.set("text", text);

	const requestOptions = {
		method: "POST",
		body: formData,
		headers: { "Accept-Language": "ru-RU" },
	};

	const response = await fetch(host + link, requestOptions);
	if (!response.ok) {
		throw {
			status: response.status,
			link: link,
		};
	}
	return await response.json();
};
