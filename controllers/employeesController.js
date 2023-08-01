const { v4: uuid } = require('uuid')
const path = require('path')
const fs = require('fs')
const fsp = require('fs').promises
const dataFile = path.join(__dirname, '..', 'model', 'employees.json')

const data = {
	employees: require(dataFile),
	setEmployees: function(data) {this.employees = data}
}

const getAllEmployees = (req, res) => {
	res.json(data.employees)
}

const getAnEmployee = async (req, res) => {
	if (!data.employees.find(employee => employee.id === req.params.id)) {
		return res.status(400).json({ error: 'the employee you want to get is not found' })
	}
	let employee = data.employees.find(employee => employee.id === req.params.id)
	res.json(employee)
}

const addAnEmployee = async (req, res) => {
	req.body.id = !req.body.id ? uuid(): toString(req.body.id)
	if (data.employees.find(employee => employee.id === req.body.id)) {
		return res.status(400).json({ error: 'employee with the same id already exist' })
	} else if(!req.body.firstname || !req.body.lastname) {
		return res.status(400).json({ error: 'employee must has a firstname and a lastname' })
	}
	data.setEmployees([...data.employees, {...req.body}])
	await fsp.writeFile(dataFile, JSON.stringify(data.employees, null, 2))
	res.status(201).json({id: uuid(), ...req.body})
}

const updateAnEmployee = async (req, res) => {
	if(req.body.id) req.body.id = `${req.body.id}`
	let updatedEmployees
	const updatedEmployee = req.body
	if (data.employees.find(employee => employee.id === req.params.id)) {
		updatedEmployees = data.employees.map(employee => (
			employee.id === req.params.id ? {...employee, ...updatedEmployee } : employee
		))
	} else if (data.employees.find(employee => employee.id === updatedEmployee.id)){
		updatedEmployees = data.employees.map(employee => (
			employee.id === updatedEmployee.id ? { ...employee, ...updatedEmployee } : employee
		))
	} else {
		return res.status(400).json({ error: 'employee not found' })
	}
	data.setEmployees(updatedEmployees)
	await fsp.writeFile(dataFile, JSON.stringify(data.employees, null, 2))
	if (req.params.id) res.json(data.employees.find(employee => employee.id === req.params.id))
	else res.status(201).json(data.employees.find(employee => employee.id === req.body.id))
}

const deleteAnEmployee =  async (req, res) => {
	if(req.body.id) req.body.id = `${req.body.id}`
	let updatedEmployees
	if (data.employees.find(employee => employee.id === req.params.id)) {
		updatedEmployees = data.employees.filter(employee => employee.id !== req.params.id )
	} else if (data.employees.find(employee => employee.id === req.body.id)){
		updatedEmployees = data.employees.filter(employee => employee.id !== req.body.id )
	} else {
		return res.status(400).json({ error: 'employee not found' })
	}
	if (req.params.id) res.json(data.employees.find(employee => employee.id === req.params.id))
	else res.json(data.employees.find(employee => employee.id === req.body.id))
	data.setEmployees(updatedEmployees)
	await fsp.writeFile(dataFile, JSON.stringify(data.employees, null, 2))
}

module.exports = {
	getAnEmployee,
	updateAnEmployee,
	deleteAnEmployee,
	getAllEmployees,
	addAnEmployee
}