const path = require('path')
const fsp = require('fs').promises
const bcrypt = require('bcryptjs')
const dataFile = path.join(__dirname, '..', 'model', 'users.json')
const data = {
	users: require(dataFile),
	setUsers: function(data) {this.users = data}
}

const addNewUser = async (req, res) => {
	let {username, password} = req.body
	if (!username || !password) {
		return res.status(400).json({error: 'both username and password required'})
	} else if (data.users.find(user => user.username === username)) {
		return res.status(401).json({error: 'there is already a user with this username'})
	}
	try {
		password = await bcrypt.hash(password, 10)
		let newUser = {username, password}
		data.setUsers([...data.users, newUser])
		await fsp.writeFile(dataFile, JSON.stringify(data.users, null, 2))
		res.status(201).json({'message': `new user ${username} succefully registered`})
	} catch(err) {
		console.error(err)
		res.status(500).json({error: `system error\t${err.name}: ${err.message}`})
	}
}


module.exports = addNewUser