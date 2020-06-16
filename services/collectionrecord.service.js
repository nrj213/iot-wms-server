/**
 * Service methods for handling collection record related actions
 */

const collectionRecordDao = require('../dao/collectionrecord.dao')
const { Response } = require('../payload/response')

exports.getCollectionRecordsByBinId = (binId) => {
    return new Promise((resolve, reject) => {
        collectionRecordDao.findAllByBinId(binId)
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}