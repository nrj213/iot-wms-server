/**
 * Controller methods for user related actions
 */

const userService = require('../services/user.service')
const { MessageCodes } = require('../utils/constants')
const { Response, ErrorResponse } = require('../payload/response')

exports.getUserByUsernameAndPassword = (req, res) => {
    const { username, password } = req.headers

    if (!(username && password)) {
        res.json(new ErrorResponse(MessageCodes.MISSING_PARAMETERS, 'Username or password missing'))
    }

    userService.getUserByUsernameAndPassword(username, password)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}