const path = require('path')
const mongoose = require('mongoose')
const User = require(path.join(__dirname, '..', 'model', 'User'))
const bcrypt = require('bcryptjs')
const { format } = require('date-fns')

const logoutHandler = async (req, res) => {
	if (!req.cookies.jwt) return res.json({message: 'you are not logged in the first place'})
	const {username, password} = req.body
	if (!username) return res.status(400).json({message: 'username is required'})
	const foundUser = await User.findOne({username}).exec()
	if (!foundUser) return res.status(400).json({message: `no user with this user name found ${username}`})
	try {
		//await User.updateOne({username}, {
		// 	refreshToken: '',
		// 	lastActiveTime: format(new Date, 'MM/dd/yyyy\tHH:mm:ss')
		// })
		foundUser.refreshToken = ''
		foundUser.lastActiveTime = format(new Date, 'MM/dd/yyyy\tHH:mm:ss')
		const result = await foundUser.save()
		res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: process.env.MODE !== 'dev'})
		res.json({message: `Succefully logged out, See you later ${username}`})
	} catch(err) {
		console.error(err)
		res.status(500).json({message: 'system error logout failed'})
	}
}

module.exports = logoutHandler