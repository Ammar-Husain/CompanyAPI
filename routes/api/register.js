const express = require('express')
const addNewUser = require('../../controllers/registerController')
const adminizeTheFirstUser = require('../../middlewares/adminizeTheFirstUser.js')
const verifyJWTs = require('../../middlewares/verifyJWTs.js')
const verifyRoles = require('../../middlewares/verifyRoles')
const ROLES_LIST = require('../../configs/roles_list')
const router = express.Router()


router.post('/', adminizeTheFirstUser)

router.post('/', verifyJWTs, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin), addNewUser)

module.exports = router