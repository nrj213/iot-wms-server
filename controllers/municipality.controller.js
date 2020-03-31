/**
 * Controller methods for bin related actions
 */

const municipalityService = require('../services/municipality.service')
const { Response, ErrorResponse } = require('../payload/response')

exports.getAllMunicipalities = (req, res) => {
    municipalityService.getAllMunicipalities()
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}