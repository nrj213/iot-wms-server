const { MessageCodes } = require('../utils/constants')

exports.Response = class {
    constructor(data, code=MessageCodes.SUCCESS, message) {
        this.data = data
        this.code = code
        this.message = message
    }
}

exports.ErrorResponse = class {
    constructor(code, message, error) {
        this.code = code
        this.message = message
        this.error = error
    }
}