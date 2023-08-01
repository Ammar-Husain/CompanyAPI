const path = require('path')
const fsp = require('fs').promises
const bcrypt = require('bcryptjs')
const dataFile = path.join(__dirname, '..', 'model', 'users.json')
const data = {}

const logoutHandler = async (req, res) => {
	if (!req.cookies.jwt) return res.json({message: 'you are not logged in the first place'})
	const jsonData = await fsp.readFile(dataFile)
	data.users = JSON.parse(jsonData)
	const {username, password} = req.body
	if (!username || !password) return res.status(400).json({message: 'you have to provide the username and the password to logout'})
	const foundUser = data.users.find(user => user.username === username)
	if (!foundUser) return res.status(400).json({message: `no user with this user name found ${username}`})
	else if(!await bcrypt.compare(password, foundUser.password)) return res.status(400).json({message: 'wrong password'})
	try {
		const updatedData = data.users.map(user => (
			user.username === username ? {...user, refreshToken: null}:user	
		))
		await fsp.writeFile(dataFile, JSON.stringify(updatedData, null, 2))
		res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: false})
		res.json({message: `Succefully logged out, See you later ${username}`})
	} catch(err) {
		console.error(err)
		res.status(500).json({message: 'system error logout failed'})
	}
}

module.exports = logoutHandler