const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	roles: {
		User: {
			type: Number,
			default: 1998
		},
		Editor: Number,
		Admin: Number,
		SuperAdmin: Number
	},
	refreshToken: String
})

module.exports = mongoose.model('User', UserSchema)