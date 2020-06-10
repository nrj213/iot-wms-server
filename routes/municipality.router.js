/**
 * Router definition for bin related paths
 */

const express = require('express')
const municipalityController = require('../controllers/municipality.controller')

var router = express.Router()

router.get('/', municipalityController.getAllMunicipalities)
router.get('/:areaId', municipalityController.getMunicipalityIdByAreaId)

module.exports = router