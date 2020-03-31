/**
 * Service methods for handling bin related actions
 */

const areaDao = require('../dao/area.dao')
const { Response } = require('../payload/response')

exports.getAreasByMunicipality = (municipalityId) => {
    return new Promise((resolve, reject) => {
        areaDao.findByMunicipality(municipalityId)
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}