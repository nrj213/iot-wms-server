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

exports.markCollection = (req, res) => {
    const body = req.body
    const binId = body['bin-id']
    const staffId = body['staff-id']

    if (binId == undefined || staffId == undefined) {
        res.json(new ErrorResponse(MessageCodes.MISSING_PARAMETERS, 'Missing Bin ID or Staff ID in request body'))
        return
    }

    if (isNaN(binId) || isNaN(staffId)) {
        res.json(new ErrorResponse(MessageCodes.PARAMATER_TYPE_MISMATCH, 'Bin ID / Staff ID passed is not if type integer'))
        return
    }

    binService.markCollection(binId, staffId)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.create = (req, res) => {
    const bin = req.body

    if (Object.keys(bin).length == 0) {
        res.json(new ErrorResponse(MessageCodes.MISSING_PARAMETERS, 'Missing details in request'))
        return
    }

    binService.create(bin)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.delete = (req, res) => {
    const binId = req.query.binId

    if (isNaN(binId)) {
        res.json(new ErrorResponse(MessageCodes.PARAMATER_TYPE_MISMATCH, 'Bin ID passed is not of type integer'))
        return
    }

    binService.delete(binId)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.update = (req, res) => {
    const bin = req.body

    if (Object.keys(bin).length == 0) {
        res.json(new ErrorResponse(MessageCodes.MISSING_PARAMETERS, 'Missing details in request'))
        return
    }

    binService.update(bin)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}

exports.modifyLevel = (req, res) => {
    const bin = req.body

    if (Object.keys(bin).length == 0) {
        res.json(new ErrorResponse(MessageCodes.MISSING_PARAMETERS, 'Missing details in request'))
        return
    }

    binService.modifyLevel(bin)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}