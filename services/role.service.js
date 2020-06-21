/**
 * Service methods for handling role related actions
 */

const roleDao = require('../dao/role.dao')
const { Response } = require('../payload/response')

exports.getAllRoles = () => {
    return new Promise((resolve, reject) => {
        roleDao.findAll()
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}