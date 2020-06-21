/**
 * Controller methods for bin related actions
 */

const municipalityService = require('../services/municipality.service')
const { MessageCodes } = require('../utils/constants')
const { Response, ErrorResponse } = require('../payload/response')

exports.getAllMunicipalities = (req, res) => {
    municipalityService.getAllMunicipalities()
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.getMunicipalityIdByAreaId = (req, res) => {
    const areaId = req.params.areaId;

    if (isNaN(areaId)) {
        res.json(new ErrorResponse(MessageCodes.PARAMATER_TYPE_MISMATCH, 'Area ID passed is not of type integer'))
        return
    }

    municipalityService.getMunicipalityIdByAreaId(areaId)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponseerr.errorCode, err.errorMessage, err.error))
}

exports.addMunicipality = (req, res) => {
    const body = req.body
    const name = body['name']

    if (name == undefined) {
        res.json(new ErrorResponse(MessageCodes.MISSING_PARAMETERS, 'Missing new municipality name in request body'))
        return
    }

    municipalityService.addMunicipality(name)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.editMunicipality = (req, res) => {
    const body = req.body
    const id = body['id']
    const name = body['name']

    if (name == undefined || id == undefined) {
        res.json(new ErrorResponse(MessageCodes.MISSING_PARAMETERS, 'Missing municipality ID/name in request body'))
        return
    }

    municipalityService.editMunicipality(id, name)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.deleteMunicipality = (req, res) => {
    const id = req.query.id

    if (id == undefined) {
        res.json(new ErrorResponse(MessageCodes.MISSING_PARAMETERS, 'Missing municipality ID in request'))
        return
    }

    municipalityService.deleteMunicipality(id)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}