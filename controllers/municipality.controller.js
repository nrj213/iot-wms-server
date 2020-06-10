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
    }

    municipalityService.getMunicipalityIdByAreaId(areaId)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponseerr.errorCode, err.errorMessage, err.error))
}