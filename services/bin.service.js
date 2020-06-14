/**
 * Service methods for handling bin related actions
 */

const binDao = require('../dao/bin.dao')
const { Response } = require('../payload/response')

exports.getAllBins = () => {
    return new Promise((resolve, reject) => {
        binDao.findAll()
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}

exports.getAllBinsByMunicipality = (municipalityId) => {
    return new Promise((resolve, reject) => {
        binDao.findByMunicipality(municipalityId)
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}

exports.getAllBinsByMunicipalityAndArea = (municipalityId, areaId) => {
    return new Promise((resolve, reject) => {
        binDao.findByMunicipalityAndArea(municipalityId, areaId)
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}

exports.markCollection = (binId, staffId) => {
    return new Promise((resolve, reject) => {
        binDao.markCollection(binId, staffId)
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}