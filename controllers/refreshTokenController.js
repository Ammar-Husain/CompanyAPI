const path = require('path')
const fsp = require('fs').promises
const jwt = require('jsonwebtoken')
require('dotenv').config()

const data = {}
const refreshTokenHandler = async (req, res) => {
	jsonData = await fsp.readFile(path.join(__dirname, '..', 'model', 'users.json'))
	data.users = JSON.parse(jsonData)
	console.log('refresh token:\t', req.cookies.jwt)
	if (!req.cookies || !req.cookies.jwt) {
		return res.status(401).json({mesage: 'no refresh token available log in to get one'})
	} 
	else if(!data.users.find(user => user.refreshToken === req.cookies.jwt)) {
		return res.status(403).json({message: 'invalid refresh token'})
	}
	try {
		const refreshToken = req.cookies.jwt
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
		const accessToken = jwt.sign(
			{ username: decoded.username },
			process.env.ACCESS_TOKEN_SECRET,
			{expiresIn: '1m'}
		)
		res.json({ accessToken })
	} catch(err) {
		console.error(err)
		return res.status(403).json({message: 'invalid refresh token'})
	}
}

module.exports = refreshTokenHandler