class HTTPError extends Error {
	constructor(response) {
		super(response.body);
		this.statusCode = response.code;
	}
}

export default HTTPError;
