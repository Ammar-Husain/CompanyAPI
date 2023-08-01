const express = require('express')
const refreshTokenHandler = require('../../controllers/refreshTokenController')
const router = express.Router()

router.get('/', refreshTokenHandler)

module.exports = router