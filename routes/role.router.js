/**
 * Router definition for role related paths
 */

const express = require('express')
const roleController = require('../controllers/role.controller')

var router = express.Router()

router.get('/', roleController.getAllRoles)

module.exports = router