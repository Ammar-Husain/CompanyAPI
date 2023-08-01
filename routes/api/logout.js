const express = require('express')
const logoutHandler = require('../../controllers/logoutController')

const router = express.Router()

router.post('/', logoutHandler)

module.exports = router