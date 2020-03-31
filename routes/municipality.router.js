/**
 * Router definition for bin related paths
 */

const express = require('express')
const municipalityController = require('../controllers/municipality.controller')

var router = express.Router()

router.get('/', municipalityController.getAllMunicipalities)

module.exports = router