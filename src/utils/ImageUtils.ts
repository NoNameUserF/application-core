import imageCompression from "browser-image-compression";
import {FileData} from "../types/globalTypes";

async function handleImageUpload(file: File): Promise<File> {
	const imageFile = file;
	let compressedFile = null;
	const options = {
		maxSizeMB: 1,
		maxWidthOrHeight: 512,
		useWebWorker: true,
	};

	try {
		compressedFile = await imageCompression(imageFile, options);
	} catch (error) {
		throw error;
	}

	return compressedFile;
}

const readImage = async (file: File): Promise<FileData> => {
	const reader = new FileReader();

	const readPromise = new Promise<string | ArrayBuffer | null>((resolve, reject) => {
		reader.onload = function (event) {
			if (event && event.target) {
				resolve(event.target.result);
			} else {
				reject("Error load file")
			}
		};

		reader.onerror = function (event) {
			if (event && event.target) {
				reject(event.target.error);
			} else {
				reject("Error on error file");
			}
		};
	});

	reader.readAsDataURL(await handleImageUpload(file));
	try {
		const src = await readPromise;
		const newFile = await handleImageUpload(file);
		return {
			src: src,
			file: newFile,
		};
	} catch (error) {
		throw error;
	}
};

export default readImage;
