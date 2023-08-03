const path = require('path')
const mongoose = require('mongoose')
const Employee = require(path.join(__dirname, '..', 'model', 'Employee'))

const getAllEmployees = async (req, res) => {
	const employees = await Employee.find()
	if (employees.length === 0) {
		return res.status(204).json({message: 'There is no employees now'})
	}
	res.json(employees)
}

const getAnEmployee = async (req, res) => {
	const id = req.params.id
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id'})
	const employee = await Employee.findOne({_id: id}).exec()
	if (!employee) {
		return res.status(400).json({ error: 'the employee you want to get is not found' })
	}
	res.json(employee)
}

const addAnEmployee = async (req, res) => {
	let {firstname, lastname} = req.body
	if(!firstname || !lastname) {
		return res.status(400).json({ error: 'employee must has a firstname and a lastname' })
	}
	const result = await Employee.create({ firstname, lastname })
	res.status(201).json(result)
}

const updateAnEmployee = async (req, res) => {
	const id = req.params.id || req.params.id
	
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id'})
	
	const employee = await Employee.findOne({_id: id}).exec()
	if (employee) {
		await Employee.updateOne({_id: employee.id}, {...updatedEmployee})
		return res.status(201).json(await Employee.findOne({_id: id}).exec())
	} 
	return res.status(400).json({ error: 'employee not found' })
}

const deleteAnEmployee =  async (req, res) => {
	const id = req.params.id || req.params.id
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id'})
	const employee = await Employee.findOne({ _id: id }).exec()
	if (employee) {
		await Employee.deleteOne({_id: employee.id})
		return res.json(employee)
	}
	return res.status(400).json({ error: 'employee not found' })
}

module.exports = {
	getAnEmployee,
	updateAnEmployee,
	deleteAnEmployee,
	getAllEmployees,
	addAnEmployee
}