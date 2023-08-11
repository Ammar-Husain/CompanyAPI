const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
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
	email: {
		type: String,
		required: true,
		unique: true
	},
	phoneNumber: {
		type: String,
		required: true,
		unique: true
	},
	refreshToken: String,
	lastActiveTime: String
})

module.exports = mongoose.model('User', UserSchema)