const mongoose = require('mongoose')
const User = require('../model/User')
const addNewUser = require('../controllers/registerController')
const adminizeTheFirstUser = async (req, res, next) => {
	const users = await User.find().exec()
	if (!users.length) addNewUser(req, res)
	else next()
}

module.exports = adminizeTheFirstUser