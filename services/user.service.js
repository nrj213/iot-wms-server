/**
 * Service methods for handling user related actions
 */

const userDao = require('../dao/user.dao')
const { Response, ErrorResponse } = require('../payload/response')
const { MessageCodes } = require('../utils/constants')

exports.getUserByUsernameAndPassword = (username, password) => {
    return new Promise((resolve, reject) => {
        userDao.findUserByUsernameAndPassword(username, password)
            .then(response => {
                if (!response.length) {
                    resolve(new ErrorResponse(MessageCodes.USER_NOT_FOUND, 'User not found'))
                }
                resolve(new Response(response[0]))
            })
            .catch(err => reject(err))
    })
}