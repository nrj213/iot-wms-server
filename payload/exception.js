exports.Exception = class {
    constructor(errMessage, errCode, err) {
        this.errorMessage = errMessage;
        this.errorCode = errCode;
        this.error = err;
    }
}