const path = require('path')
const mongoose = require('mongoose')
const User = require(path.join(__dirname, '..', 'model', 'User'))
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
	let { username, password } = req.body
	if (!username || !password) {
		return res.status(400).json({ error: 'both username and password required' })
	}
	try {
		let user = await User.findOne({username}).exec()
		if (!user) return res.status(400).json({error: `no user with this username ${username}`})
		const isMatch = await bcrypt.compare(password, user.password)
		if (isMatch) {
			// creat jwts
			const userRoles = Object.values(user.roles)
			const accessToken = jwt.sign(
				{username: user.username, roles: userRoles},
				process.env.ACCESS_TOKEN_SECRET,
				{expiresIn: '30m'}
			)
			const refreshToken = jwt.sign(
				{username: user.username},
				process.env.REFRESH_TOKEN_SECRET,
				{expiresIn: '1d'}
			)
			await User.updateOne({username}, {refreshToken})
			res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: process.env.MODE !== 'dev'})		
			return res.json({accessToken, refreshToken})
		} else {
			return res.status(400).json({'message': 'wrong password try again'})
		}
 	} catch (err) {
		console.error(err)
		res.status(500).json({ error: `system error\t${err.name}: ${err.message}` })
	}
}

module.exports = handleLogin