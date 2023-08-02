const express = require('express')
const employeesControllers = require('../../controllers/employeesController')
const verifyRoles = require('../../middlewares/verifyRoles')
const ROLES_LIST = require('../../configs/roles_list')
const router = express.Router()

router.use('/', (req, res, next) => {
	next()
})
router.route('/')
	.get(employeesControllers.getAllEmployees)
	.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin,  ROLES_LIST.Editor), employeesControllers.addAnEmployee)
	.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin, ROLES_LIST.Editor), employeesControllers.updateAnEmployee)
	.delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin), employeesControllers.deleteAnEmployee)
	
router.route('/:id')
	.get(employeesControllers.getAnEmployee)
	.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin, ROLES_LIST.Editor), employeesControllers.updateAnEmployee)
	.delete(verifyRoles(ROLES_LIST.Admin), employeesControllers.deleteAnEmployee)
	
module.exports = router