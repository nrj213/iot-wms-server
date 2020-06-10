/**
 * Service methods for handling bin related actions
 */

const municipalityDao = require('../dao/municipality.dao')
const { Response } = require('../payload/response')

exports.getAllMunicipalities = () => {
    return new Promise((resolve, reject) => {
        municipalityDao.findAll()
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}

exports.getMunicipalityIdByAreaId = (areaId) => {
    return new Promise((resolve, reject) => {
        municipalityDao.findMunicipalityIdIdByAreaId(areaId)
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}