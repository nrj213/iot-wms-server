/**
 * Controller methods for bin related actions
 */

const binService = require('../services/bin.service')
const { MessageCodes } = require('../utils/constants')
const { Response, ErrorResponse } = require('../payload/response')

exports.getAllBins = (req, res) => {
    binService.getAllBins()
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.getBinsByMunicipality = (req, res) => {
    const municipalityId = req.params.municipality

    if (isNaN(municipalityId)) {
        res.json(new ErrorResponse(MessageCodes.PARAMATER_TYPE_MISMATCH, 'Municipality ID passed is not of type integer'))
    }

    binService.getAllBinsByMunicipality(municipalityId)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.getBinsByMunicipalityAndArea = (req, res) => {
    const municipalityId = req.params.municipality
    const areaId = req.params.area

    if (isNaN(municipalityId) || isNaN(areaId)) {
        res.json(new ErrorResponse(MessageCodes.PARAMATER_TYPE_MISMATCH, 'Municipality ID / Area ID passed is not of type integer'))
    }

    binService.getAllBinsByMunicipalityAndArea(municipalityId, areaId)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}