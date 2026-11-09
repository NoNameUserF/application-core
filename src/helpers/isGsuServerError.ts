import { GsuError, IGsuServerError } from "../types/globalTypes";

export const isGsuServerError = (error: GsuError): error is IGsuServerError => {
	return typeof error === 'object' && error !== null && error !== undefined && 'status' in error;
};