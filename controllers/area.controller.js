/**
 * Controller methods for bin related actions
 */

const areaService = require('../services/area.service')
const { MessageCodes } = require('../utils/constants')
const { Response, ErrorResponse } = require('../payload/response')

exports.getAreasByMunicipality = (req, res) => {
    const municipalityId = req.params.municipality

    if (isNaN(municipalityId)) {
        res.json(new ErrorResponse(MessageCodes.PARAMATER_TYPE_MISMATCH, 'Municipality ID passed is not of type integer'))
        return
    }

    areaService.getAreasByMunicipality(municipalityId)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.addArea = (req, res) => {
    const body = req.body
    const name = body['name']
    const municipality_id = body['municipality-id'];

    if (name == undefined || municipality_id == undefined) {
        res.json(new ErrorResponse(MessageCodes.MISSING_PARAMETERS, 'Missing new area name or muncipality ID in request body'))
        return
    }

    areaService.addArea(name, municipality_id)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.editArea = (req, res) => {
    const body = req.body
    const id = body['id']
    const name = body['name']

    if (name == undefined || id == undefined) {
        res.json(new ErrorResponse(MessageCodes.MISSING_PARAMETERS, 'Missing area ID/name in request body'))
        return
    }

    areaService.editArea(id, name)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.deleteArea = (req, res) => {
    const id = req.query.id

    if (id == undefined) {
        res.json(new ErrorResponse(MessageCodes.MISSING_PARAMETERS, 'Missing area ID in request'))
        return
    }

    areaService.deleteArea(id)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}