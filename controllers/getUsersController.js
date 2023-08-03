const mongoose = require('mongoose')
const User = require('../model/User')

const getAllUsers = async (req, res) => {
	const users = await User.find()
	res.json(users)
}

const getAUser = async (req, res) => {
	if (!req.params.id) return res.status(400).json({message: 'user id requied'})
	try {
		const id = req.params.id
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id'})
		const user = await User.findOne({_id: id}).exec()
		if (!user) return res.json({message: 'No user matches the id you provided'})
		res.json(user)
	} catch(err) {
		console.log(`${err.name}: ${err.message}`)
	}
}

module.exports = {getAUser, getAllUsers}