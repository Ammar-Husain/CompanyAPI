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
	.post(employeesControllers.addAnEmployee)
	.put(employeesControllers.updateAnEmployee)
	.delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin, ROLES_LIST.Editor), employeesControllers.deleteAnEmployee)
	
router.route('/:id')
	.get(employeesControllers.getAnEmployee)
	.put(employeesControllers.updateAnEmployee)
	.delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Super_Admin, ROLES_LIST.Editor), employeesControllers.deleteAnEmployee)
	
module.exports = router