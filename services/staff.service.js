/**
 * Service methods for handling staff related actions
 */

const staffDao = require('../dao/staff.dao')
const { Response, ErrorResponse } = require('../payload/response')
const { MessageCodes } = require('../utils/constants')

exports.getStaffById = (staffId) => {
    return new Promise((resolve, reject) => {
        staffDao.findStaffById(staffId)
            .then(response => {
                if (!response.length) {
                    resolve(new ErrorResponse(MessageCodes.USER_NOT_FOUND, 'Staff not found'))
                }
                resolve(new Response(response[0]))
            })
            .catch(err => reject(err))
    })
}

exports.getAllStaffByAreaId = (areaId) => {
    return new Promise((resolve, reject) => {
        staffDao.findAllStaffByAreaId(areaId)
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}