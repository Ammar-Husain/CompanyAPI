const path = require('path')
const bcrypt = require('bcryptjs')
const User = path.join(__dirname, '..', 'model', 'User')
// const fsp = require('fs').promises
// const dataFile = path.join(__dirname, '..', 'model', 'users.json')
// const data = {}

const addNewUser = async (req, res) => {
	jsonData = await fsp.readFile(dataFile)
	data.users = JSON.parse(jsonData)
	let {username, password, roles} = req.body
	if (roles) {
		if (Object.values(roles).includes(2002) && !req.roles.includes(2004)) {
			return res.status(401).json({message: 'Only super Admin can add admins'})
		} else if (Object.values(roles).includes(2004) && !req.roles.includes(2004)){
			return res.status(401).json({message: 'Only super Admins can add Super admin'})
		} else if (Object.values(roles).includes(2004) && req.roles.includes(2004)) {
			data.users.find(user => user.username === req.user).roles = {'User': 1998, 'Admin': 2002}
			// in the client side the frontend developer have to remove the previous super_admin access token because it still a super_admin access token
		}
	}
	if (!username || !password) {
		return res.status(400).json({error: 'both username and password required'})
	} else if (data.users.find(user => user.username === username)) {
		return res.status(401).json({error: 'there is already a user with this username'})
	}
	try {
		password = await bcrypt.hash(password, 10)
		let initialRole = data.users.length ? {'User': 2000}: {'User': 1998, 'Super_Admin': 2004}
		let newUser = {username, password, roles: {...roles, ...initialRole}}
		data.users = [...data.users, newUser]
		await fsp.writeFile(dataFile, JSON.stringify(data.users, null, 2))
		res.status(201).json({'message': `new user ${username} succefully registered`})
	} catch(err) {
		console.error(err)
		res.status(500).json({error: `system error\t${err.name}: ${err.message}`})
	}
}


module.exports = addNewUser