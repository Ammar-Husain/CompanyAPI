const mongoose = require('mongoose')
const User = require('../model/User')

const updateUser = async (req, res) => {
	const id = req.params.id || req.body.id
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id'})
	let updatedUser = req.body
	if (!id) return res.status(400).json({message: 'user id required'})
	let user = await User.findOne({_id: id}).exec()
	if (!user) return res.status(203).json(({message: 'no employee matches the id you provided'})) 
	else if (user.roles.SuperAdmin === 2004 && !req.roles.includes(2004)) {
		return res.status(403).json({ message: 'Only super Admin can edit his data' })
	} else if (user.roles.Admin === 2002 && !req.roles.includes(2004)) {
		return res.status(403).json({ message: 'Only super Admin Can edit Admins Data' })
	}
	if (req.body.roles) {
		const userUpdatedrolesList = Object.values(req.body.roles)
		if ((userUpdatedrolesList.includes(2002) || userUpdatedrolesList.includes(2004)) && !req.roles.includes(2004)) {
			return res.status(403).json({messgae: 'Only Super Admin Can make a person An Admin or a Super Admin'})
		} else if (userUpdatedrolesList.includes(2004)) {
			await User.updateOne({roles:{User: 1998, SuperAdmin: 2004}}, {roles:{User: 1998, Admin: 2002}})
		} else if (user.roles.SuperAdmin === 2004 && userUpdatedrolesList.length && !userUpdatedrolesList.includes(2004)) {
			console.log('Hey where are you going without saying goodby')
			return res.status(409).json({messgae: 'You have to make another user a Super Admin before leaving quiting position '})
		}
	}
	try {
		await User.updateOne({_id: id}, {...updatedUser})
		const result = await User.findOne({_id: id}).exec()
		res.json(result)
	} catch(err) {
		res.status(500).json({message :'Server Error. Try again later'})
		conole.error(err)
	}
}

module.exports = updateUser