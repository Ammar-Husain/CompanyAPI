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
		return res.status(400).json({ message: 'the employee you want to get is not found' })
	}
	res.json(employee)
}

const addAnEmployee = async (req, res) => {
	let {firstname, lastname, email, phoneNumber, birthDate, employmentStatus} = req.body
	if(!firstname) {
		return res.status(400).json({ message: 'firstname required.' })
	} else if (!lastname) {
		return res.status(400).json({ message: 'lastname required.' })
	} else if (!email) {
		return res.status(400).json({ message: 'email required.' })
	} else if (!phoneNumber) {
		return res.status(400).json({ message: 'phone number required.' })
	} else if (!birthDate) {
		return res.status(400).json({ message: 'birth date required.' })
	} else if (!employmentStatus) {
		return res.status(400).json({ message: 'employment Status required.' })
	}
	firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1)
	lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1)
	const result = await Employee.create({
		firstname, lastname, email, phoneNumber, birthDate, employmentStatus
	})
	res.status(201).json(result)
}

const updateAnEmployee = async (req, res) => {
	const id = req.params.id || req.body.id
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id'})
	
	const employee = await Employee.findOne({_id: id}).exec()
	if (employee) {
		const updatedEmployee = req.body
		await Employee.updateOne({_id: employee.id}, {...updatedEmployee})
		return res.status(201).json(await Employee.findOne({_id: id}).exec())
	} 
	return res.status(400).json({ message: 'employee not found' })
}

const deleteAnEmployee =  async (req, res) => {
	const id = req.params.id || req.body.id
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id'})
	const employee = await Employee.findOne({ _id: id }).exec()
	if (employee) {
		await Employee.deleteOne({_id: employee.id})
		return res.json(employee)
	}
	return res.status(400).json({ message: 'employee not found' })
}

module.exports = {
	getAnEmployee,
	updateAnEmployee,
	deleteAnEmployee,
	getAllEmployees,
	addAnEmployee
}