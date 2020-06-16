/**
 * Controller methods for collection record related actions
 */

const collectionRecordService = require('../services/collectionrecord.service')
const { MessageCodes } = require('../utils/constants')
const { Response, ErrorResponse } = require('../payload/response')

exports.getCollectionRecordsByBinId = (req, res) => {
    const binId = req.params.binId

    if (isNaN(binId)) {
        res.json(new ErrorResponse(MessageCodes.PARAMATER_TYPE_MISMATCH, 'Bin ID passed is not of type integer'))
        return
    }

    collectionRecordService.getCollectionRecordsByBinId(binId)
        .then(data => res.json(data))
        .catch(err => res.json(new ErrorResponse(err.errorCode, err.errorMessage, err.error)))
}