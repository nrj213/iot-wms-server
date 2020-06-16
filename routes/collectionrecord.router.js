/**
 * Router definition for collection record related paths
 */

const express = require('express')
const collectionRecordController = require('../controllers/collectionrecord.controller')

var router = express.Router()

router.get('/:binId', collectionRecordController.getCollectionRecordsByBinId)

module.exports = router