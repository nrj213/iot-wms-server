/**
 * Service methods for handling staff related actions
 */

const staffDao = require('../dao/staff.dao')
const userDao = require('../dao/user.dao')
const { Response, ErrorResponse } = require('../payload/response')
const { Exception } = require('../payload/exception')
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

exports.create = (user) => {
    return new Promise((resolve, reject) => {
        staffDao.create(user)
            .then(response => {
                if (response['recordset']) {
                    user['staffId'] = response['recordset'][0]['staffId']
                    userDao.create(user)
                        .then(result => resolve(new Response(result['rowsAffected'][0])))
                        .catch(error => reject(new Exception('Failed to add staff information to DB', MessageCodes.DB_QUERY_FAILED, error)))
                } else {
                    reject(new Exception('Failed to add staff information to DB', MessageCodes.DB_QUERY_FAILED))
                }
            })
            .catch(error => reject(new Exception('Failed to add staff information to DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}

exports.delete = (staffId, userId) => {
    return new Promise((resolve, reject) => {
        userDao.delete(userId)
            .then(response => {
                if (response['rowsAffected'][0]) {
                    staffDao.delete(staffId)
                        .then(result => resolve(new Response(result['rowsAffected'][0])))
                        .catch(error => reject(new Exception('Failed to delete staff information from DB', MessageCodes.DB_QUERY_FAILED, error)))
                } else {
                    reject(new Exception('Failed to delete staff information from DB', MessageCodes.DB_QUERY_FAILED))
                }
            })
            .catch(error => reject(new Exception('Failed to delete staff information from DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}

exports.update = (user) => {
    return new Promise((resolve, reject) => {
        userDao.update(user)
            .then(response => {
                if (response['rowsAffected'][0]) {
                    staffDao.update(user)
                        .then(result => resolve(new Response(result['rowsAffected'][0])))
                        .catch(error => reject(new Exception('Failed to update staff information in DB', MessageCodes.DB_QUERY_FAILED, error)))
                } else {
                    reject(new Exception('Failed to update staff information in DB', MessageCodes.DB_QUERY_FAILED))
                }
            })
            .catch(error => reject(new Exception('Failed to update staff information in DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}