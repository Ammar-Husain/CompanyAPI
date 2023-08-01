const path = require('path')
const fsp = require('fs').promises
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const dataFile = path.join(__dirname, '..', 'model', 'users.json')
const data = {}

const handleLogin = async (req, res) => {
	// when i used require data was not updating untill te server restart
	// data.users = require(dataFile)
	// by reading te file the data will be updated but the app will crash of successive requests come
	jsonData = await fsp.readFile(dataFile)
	data.users = JSON.parse(jsonData)
	let { username, password } = req.body
	if (!username || !password) {
		return res.status(400).json({ error: 'both username and password required' })
	}
	try {
		let user = data.users.find(user => user.username === username)
		if (!user) return res.status(400).json({error: `no user with this username ${username}`})
		const isMatch = await bcrypt.compare(password, user.password)
		if (isMatch) {
			// creat jwts
			const accessToken = jwt.sign(
				{username: user.username},
				process.env.ACCESS_TOKEN_SECRET,
				{expiresIn: '30m'}
			)
			const refreshToken = jwt.sign(
				{username: user.username},
				process.env.REFRESH_TOKEN_SECRET,
				{expiresIn: '1d'}
			)
			data.users = data.users.map(user => (
				user.username === username ? {...user, refreshToken}: user	
			))
			await fsp.writeFile(dataFile, JSON.stringify(data.users, null, 2))
			res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'none', secure: false})		
			res.header('Access-Control-Allow-Credentials', true)
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