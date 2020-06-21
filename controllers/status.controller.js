/**
 * Controller methods for status related actions
 */

const statusService = require('../services/status.service')
const { MessageCodes } = require('../utils/constants')
const { Response, ErrorResponse } = require('../payload/response')

exports.getAllStatus = (req, res) => {
    statusService.getAllStatus()
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}