const express = require('express')
const employeesControllers = require('../../controllers/employeesController')
const router = express.Router()

router.use('/', (req, res, next) => {
	console.log('emplyees router called')
	next()
})
router.route('/')
	.get(employeesControllers.getAllEmployees)
	.post(employeesControllers.addAnEmployee)
	.put(employeesControllers.updateAnEmployee)
	.delete(employeesControllers.deleteAnEmployee)
	
router.route('/:id')
	.get(employeesControllers.getAnEmployee)
	.put(employeesControllers.updateAnEmployee)
	.delete(employeesControllers.deleteAnEmployee)
	
module.exports = router