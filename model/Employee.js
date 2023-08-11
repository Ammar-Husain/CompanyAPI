const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	birthDate: {
		type: String,
		required: true
	},
	employmentStatus: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Employee', EmployeeSchema)