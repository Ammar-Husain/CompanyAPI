const path = require('path')
const mongoose = require('mongoose')
const User = require(path.join(__dirname, '..', 'model', 'User'))
const bcrypt = require('bcryptjs')

const addNewUser = async (req, res) => {
	let {username, password, roles} = req.body
	if (roles) {
		if (Object.values(roles).includes(2002) && !req.roles.includes(2004)) {
			return res.status(401).json({message: 'Only super Admin can add admins'})
		} else if (Object.values(roles).includes(2004) && !req.roles.includes(2004)){
			return res.status(401).json({message: 'Only super Admins can add Super admin'})
		} 
		// edit the super admin's role to admin
		else if (Object.values(roles).includes(2004) && req.roles.includes(2004)) {
			await User.updateOne({roles:{User: 1998, SuperAdmin: 2004}}, {roles:{User: 1998, Admin: 2002}})
			// in the client side the frontend developer have to remove the previous super_admin access token because it still a super_admin access token
		}
	}
	if (!username || !password) {
		return res.status(400).json({error: 'both username and password required'})
	}
	const duplicatedUser = await User.findOne({username}).exec()
	if (duplicatedUser) {
		return res.status(401).json({error: 'there is already a user with this username'})
	}
	try {
		password = await bcrypt.hash(password, 10)
		const users = await User.find().exec()
		const initialRole = users.length === 0 ? {SuperAdmin: 2004} : {User: 1998}
		let newUser = {username, password, roles: {...roles, ...initialRole}}
		User.create({
			username,
			password,
			roles: {
				...roles,
				...initialRole
			}
		})
		res.status(201).json({'message': `new user ${username} succefully registered`})
	} catch(err) {
		console.error(err)
		res.status(500).json({error: `system error ${err.name}: ${err.message}`})
	}
}


module.exports = addNewUser

// const ragamDoria = 114152104