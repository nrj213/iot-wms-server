/**
 * Controller methods for staff related actions
 */

const staffService = require('../services/staff.service')
const { MessageCodes } = require('../utils/constants')
const { Response, ErrorResponse } = require('../payload/response')

exports.getStaffById = (req, res) => {
    const staffId = req.params.staffId

    if (isNaN(staffId)) {
        res.json(new ErrorResponse(MessageCodes.PARAMATER_TYPE_MISMATCH, 'Staff ID passed is not of type integer'))
        return
    }

    staffService.getStaffById(staffId)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}