/**
 * Controller methods for role related actions
 */

const roleService = require('../services/role.service')
const { MessageCodes } = require('../utils/constants')
const { Response, ErrorResponse } = require('../payload/response')

exports.getAllRoles = (req, res) => {
    roleService.getAllRoles()
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}