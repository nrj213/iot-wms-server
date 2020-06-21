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

exports.addArea = (name, municipality_id) => {
    return new Promise((resolve, reject) => {
        areaDao.create(name, municipality_id)
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}

exports.editArea = (id, name) => {
    return new Promise((resolve, reject) => {
        areaDao.update(id, name)
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}

exports.deleteArea = (id) => {
    return new Promise((resolve, reject) => {
        areaDao.delete(id)
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}