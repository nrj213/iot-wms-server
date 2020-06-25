/**
 * Router definition for bin related paths
 */

const express = require('express')
const binController = require('../controllers/bin.controller')

var router = express.Router()

router.get('/', binController.getAllBins)
router.get('/:municipality', binController.getBinsByMunicipality)
router.get('/:municipality/:area', binController.getBinsByMunicipalityAndArea)
router.put('/collected', binController.markCollection)
router.post('', binController.create)
router.put('', binController.update)
router.delete('', binController.delete)
router.post('/level', binController.modifyLevel)

module.exports = router