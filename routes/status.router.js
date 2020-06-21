/**
 * Router definition for status related paths
 */

const express = require('express')
const statusontroller = require('../controllers/status.controller')

var router = express.Router()

router.get('/', statusontroller.getAllStatus)

module.exports = router