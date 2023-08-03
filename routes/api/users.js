const express = require('express')
const router = express.Router()

const adminizeTheFirstUser = require('../../middlewares/adminizeTheFirstUser.js')
const addNewUser = require('../../controllers/registerController')
const handleLogin = require('../../controllers/authController')
const refreshTokenHandler = require('../../controllers/refreshTokenController')
const logoutHandler = require('../../controllers/logoutController')
const { getAUser, getAllUsers } = require('../../controllers/getUsersController')
const deleteUser = require('../../controllers/deleteUserController')
const updateUser = require('../../controllers/updateUserController')
const verifyJWTs = require('../../middlewares/verifyJWTs.js')
const verifyRoles = require('../../middlewares/verifyRoles')
const ROLES_LIST = require('../../configs/roles_list')

router.get('/refresh', refreshTokenHandler)
router.get('/', verifyJWTs,  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin), getAllUsers)
router.get('/:id', verifyJWTs, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin), getAUser)
router.post('/register', adminizeTheFirstUser)
router.post('/register', verifyJWTs, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin), addNewUser)
router.post('/login', handleLogin)
router.post('/logout', verifyJWTs,  logoutHandler)

router.delete('/delete', verifyJWTs, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin), deleteUser)
router.delete('/', verifyJWTs, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin), deleteUser)
router.delete('/delete/:id', verifyJWTs, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin), deleteUser)
router.delete('/:id', verifyJWTs, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin), deleteUser)

router.put('/update', verifyJWTs, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin), updateUser)
router.put('/', verifyJWTs, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin), updateUser)
router.put('/update/:id', verifyJWTs, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin), updateUser)
router.put('/:id', verifyJWTs, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin), updateUser)


module.exports = router