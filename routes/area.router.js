/**
 * Router definition for bin related paths
 */

const express = require('express')
const areaController = require('../controllers/area.controller')

var router = express.Router()

router.get('/:municipality', areaController.getAreasByMunicipality)
router.post('', areaController.addArea)
router.put('', areaController.editArea)
router.delete('', areaController.deleteArea)

module.exports = router