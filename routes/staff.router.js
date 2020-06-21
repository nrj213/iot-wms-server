/**
 * Router definition for staff related paths
 */

const express = require('express')
const staffController = require('../controllers/staff.controller')

var router = express.Router()

router.get('', staffController.getAllStaff)
router.get('/:staffId', staffController.getStaffById)

module.exports = router