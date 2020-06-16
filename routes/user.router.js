/**
 * Router definition for user related paths
 */

const express = require('express')
const userController = require('../controllers/user.controller')

var router = express.Router()

router.get('', userController.getUserByUsernameAndPassword)

module.exports = router