const path = require('path')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require(path.join(__dirname, '..', 'model', 'User'))

const refreshTokenHandler = async (req, res) => {
	console.log(req.cookies)
	if (!req.cookies || !req.cookies.jwt) {
		return res.status(401).json({mesage: 'no refresh token available log in to get one'})
	} 
	const user = await User.findOne({refreshToken : req.cookies.jwt}).exec()
	if(!user) {
		return res.status(403).json({message: 'invalid refresh token'})
	}
	try {
		const refreshToken = req.cookies.jwt
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
		const userRoles = Object.values(user.roles)
		const accessToken = jwt.sign(
			{ username: decoded.username, roles: userRoles },
			process.env.ACCESS_TOKEN_SECRET,
			{expiresIn: '15m'}
		)
		res.json({ accessToken, user})
	} catch(err) {
		console.error(err)
		return res.status(403).json({message: 'invalid refresh token'})
	}
}

module.exports = refreshTokenHandler