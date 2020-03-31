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
    }

    areaService.getAreasByMunicipality(municipalityId)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}