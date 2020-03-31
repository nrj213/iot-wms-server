/**
 * Router definition for bin related paths
 */

const express = require('express')
const areaController = require('../controllers/area.controller')

var router = express.Router()

router.get('/:municipality', areaController.getAreasByMunicipality)

module.exports = router