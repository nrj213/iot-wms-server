/**
 * Router definition for municipality related paths
 */

const express = require('express')
const municipalityController = require('../controllers/municipality.controller')

var router = express.Router()

router.get('/', municipalityController.getAllMunicipalities)
router.get('/:areaId', municipalityController.getMunicipalityIdByAreaId)
router.post('', municipalityController.addMunicipality)
router.put('', municipalityController.editMunicipality)
router.delete('', municipalityController.deleteMunicipality)

module.exports = router