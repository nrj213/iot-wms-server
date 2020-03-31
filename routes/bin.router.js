/**
 * Router definition for bin related paths
 */

const express = require('express')
const binController = require('../controllers/bin.controller')

var router = express.Router()

router.get('/', binController.getAllBins)
router.get('/:municipality', binController.getBinsByMunicipality)
router.get('/:municipality/:area', binController.getBinsByMunicipalityAndArea)

module.exports = router