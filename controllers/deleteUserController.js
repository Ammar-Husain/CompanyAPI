const mongoose = require('mongoose')
const User = require('../model/User')

const deleteUser = async (req, res) => {
	const id = req.params.id ? req.params.id : req.body.id
	let updatedUser = req.body
	if (!id) return res.status(400).json({ message: 'user id required'})
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id'})
	try {
		let user = await User.findOne({ _id: id }).exec()
		if (!user) return res.status(203).json(({ message: 'no user matches the id you provided' }))
		if (user.roles.SuperAdmin === 2004) return res.status(403).json({message: 'Superd Admin cannot be deleted'})
		if (user.roles.Admin === 2002 && !req.roles.includes(2004)) {
			return res.status(403).json({message: 'Only super Admin Can delete Admins'})
		}
			await User.deleteOne({ _id: id }, { ...updatedUser })
			res.json(user)
	} catch (err) {
		res.status(500).json({ message: 'Server Error. Try again later' })
		conole.error(err)
	}
}

module.exports = deleteUser