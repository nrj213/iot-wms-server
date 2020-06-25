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

exports.getAllStaffByAreaId = (req, res) => {
    const areaId = req.query.areaId

    if (isNaN(areaId)) {
        res.json(new ErrorResponse(MessageCodes.PARAMATER_TYPE_MISMATCH, 'Area ID passed is not of type integer'))
        return
    }

    staffService.getAllStaffByAreaId(areaId)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.create = (req, res) => {
    const user = req.body

    if (Object.keys(user).length == 0) {
        res.json(new ErrorResponse(MessageCodes.MISSING_PARAMETERS, 'Missing details in request'))
        return
    }
    
    staffService.create(user)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.delete = (req, res) => {
    const staffId = req.query.staffId
    const userId = req.query.userId

    if (isNaN(staffId) || isNaN(userId)) {
        res.json(new ErrorResponse(MessageCodes.PARAMATER_TYPE_MISMATCH, 'Staff ID/Area ID passed is not of type integer'))
        return
    }

    staffService.delete(staffId, userId)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.update = (req, res) => {
    const user = req.body

    if (Object.keys(user).length == 0) {
        res.json(new ErrorResponse(MessageCodes.MISSING_PARAMETERS, 'Missing details in request'))
        return
    }
    
    staffService.update(user)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}