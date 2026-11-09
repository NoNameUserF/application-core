const httpResponseCodeList = {
	okStatus: 200,
	created: 201,
	accepted: 202,
	noContent: 205,
	badRequest: 400,
	unauthorizedStatus: 401,
	forbiddenStatus: 403,
	notFound: 404,
	methodNotAllowed: 405,
	conflict: 409,
	tooManyRequests: 429,
	internalServerError: 500,
	badGateway: 502,
	serviceUnavailable: 503,
};

export default httpResponseCodeList;
