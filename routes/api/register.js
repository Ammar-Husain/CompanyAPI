const express = require('express')
const addNewUser = require('../../controllers/registerController')

const router = express.Router()

router.post('/', addNewUser)

module.exports = router