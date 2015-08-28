class CommonError {
	constructor() {
		this.value = "";
		this.message = "";
	}

	validate() {
		return true;
	}

	static createFromResponse(commonErrorJson) {
		var commonError = new CommonError();
		commonError.value = commonErrorJson.value;
		commonError.message = commonErrorJson.message;
		return commonError;
	}
}
module.exports = CommonError;