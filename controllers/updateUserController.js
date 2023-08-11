const mongoose = require('mongoose')
const User = require('../model/User')
const bcrypt = require('bcryptjs')

const updateUser = async (req, res) => {
	console.log(`the requester username is ${req.user}`)
	const id = req.params.id || req.body.id
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id'})
	let updatedUser = req.body
	console.log(`the requested username is ${updatedUser.username}`)
	if (!id) return res.status(400).json({message: 'user id required'})
	let user = await User.findOne({_id: id}).exec()
	if (!user) return res.status(203).json(({message: 'no employee matches the id you provided'})) 
	else if (user.roles.SuperAdmin === 2004 && !req.roles.includes(2004)) {
	} else if (user.roles.Admin === 2002 && !req.roles.includes(2004) && req.user !== user.username) {
		return res.status(403).json({ message: 'Only super Admin Can edit other Admins Data' })
	}
	if (req.body.roles) {
		const userUpdatedrolesList = Object.values(req.body.roles)
		if ((userUpdatedrolesList.includes(2002) || userUpdatedrolesList.includes(2004)) && !req.roles.includes(2004) && !(userUpdatedrolesList.includes(2002) && !userUpdatedrolesList.includes(2004) && req.roles.includes(2002) && !req.roles.includes(2004) && req.user === user.username)) {
			return res.status(403).json({messgae: 'Only Super Admin Can make a person An Admin or a Super Admin'})
		} else if (userUpdatedrolesList.includes(2004)) {
			await User.updateOne({roles:{User: 1998, SuperAdmin: 2004}}, {roles:{User: 1998, Admin: 2002}})
		} else if (user.roles.SuperAdmin === 2004 && userUpdatedrolesList.length && !userUpdatedrolesList.includes(2004)) {
			console.log('Hey where are you going without saying goodby')
			return res.status(409).json({messgae: 'You have to make another user a Super Admin before leaving the position '})
		} else if (userUpdatedrolesList.includes(2004) && req.roles.includes(2004)) {
			await User.updateOne({ roles: { User: 1998, SuperAdmin: 2004 } }, { roles: { User: 1998, Admin: 2002 } })
			// in the client side the frontend developer have to remove the previous super_admin access token because it still a super_admin access token
		}
	}
	const sameUserName = await User.findOne({ username: updatedUser.username }).exec()
	if (sameUserName && sameUserName._id.toString() !== id) {
		return res.status(401).json({ message: 'there is already a user with this username' })
	}
	try {
		if (updatedUser.password) {
			updatedUser.password = await bcrypt.hash(updatedUser.password, 10)
		}
		await User.updateOne({_id: id}, {...updatedUser})
		const result = await User.findOne({_id: id}).exec()
		res.json(result)
	} catch(err) {
		res.status(500).json({message :'Server Error. Try again later'})
		conole.error(err)
	}
}

module.exports = updateUser