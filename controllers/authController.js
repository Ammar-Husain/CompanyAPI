const path = require('path')
const mongoose = require('mongoose')
const User = require(path.join(__dirname, '..', 'model', 'User'))
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
	let { username, password } = req.body
	if (!username) {
		return res.status(400).json({ message: 'username required' })
	} else if(!password) {
		return res.status(400).json({ message: 'password required' })
	}
	try {
		let user = await User.findOne({username}).exec()
		if (!user) return res.status(400).json({ message: `no user with this username "${username}" found`})
		const isMatch = await bcrypt.compare(password, user.password)
		if (isMatch) {
			// creat jwts
			const userRoles = Object.values(user.roles)
			const accessToken = jwt.sign(
				{username: user.username, roles: userRoles},
				process.env.ACCESS_TOKEN_SECRET,
				{expiresIn: '15m'}
			)
			const refreshToken = jwt.sign(
				{username: user.username},
				process.env.REFRESH_TOKEN_SECRET,
				{expiresIn: '1d'}
			)
			await User.updateOne({username}, {refreshToken, lastActiveTime: 'now'})
			res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: process.env.MODE !== 'dev'})		
			return res.json({accessToken, user})
		} else {
			return res.status(400).json({message: 'wrong password try again'})
		}
 	} catch (err) {
		console.error(err)
		res.status(500).json({message: `System error. Try again later` })
	}
}

module.exports = handleLogin