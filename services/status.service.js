/**
 * Service methods for handling status related actions
 */

const statusDao = require('../dao/status.dao')
const { Response } = require('../payload/response')

exports.getAllStatus = () => {
    return new Promise((resolve, reject) => {
        statusDao.findAll()
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}