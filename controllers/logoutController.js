const path = require('path')
const mongoose = require('mongoose')
const User = require(path.join(__dirname, '..', 'model', 'User'))
const bcrypt = require('bcryptjs')

const logoutHandler = async (req, res) => {
	if (!req.cookies.jwt) return res.json({message: 'you are not logged in the first place'})
	const {username, password} = req.body
	if (!username || !password) return res.status(400).json({message: 'you have to provide the username and the password to logout'})
	const foundUser = await User.findOne({username}).exec()
	if (!foundUser) return res.status(400).json({message: `no user with this user name found ${username}`})
	else if(!await bcrypt.compare(password, foundUser.password)) return res.status(400).json({message: 'wrong password'})
	try {
		User.updateOne({username}, {refreshToken: ''})
		res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: process.env.MODE !== 'dev'})
		res.json({message: `Succefully logged out, See you later ${username}`})
	} catch(err) {
		console.error(err)
		res.status(500).json({message: 'system error logout failed'})
	}
}

module.exports = logoutHandler