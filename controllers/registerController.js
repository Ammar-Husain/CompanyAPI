const path = require('path')
const mongoose = require('mongoose')
const User = require(path.join(__dirname, '..', 'model', 'User'))
const bcrypt = require('bcryptjs')
const {format} = require('date-fns')

const addNewUser = async (req, res) => {
	let {username, password, email, phoneNumber, roles} = req.body
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
	if (!username) {
		return res.status(400).json({ message: 'username required'})
	} else if (!password) {
		return res.status(400).json({ message: 'password required'})
	} else if (!email) {
		return res.status(400).json({ message: 'email required' })
	} else if (!phoneNumber) {
		return res.status(400).json({ message: 'phoneNumber required' })
	}
	
	const duplicatedUser = await User.findOne({username}).exec()
	if (duplicatedUser) {
		return res.status(401).json({
			message: 'there is already a user with this username',
			duplicated: 'username'
		})
	}
	const duplicatedNumber = await User.findOne({phoneNumber}).exec()
	if (duplicatedNumber) {
		return res.status(401).json({
			message: 'there is already a user with this phoneNumber',
			duplicated: 'phoneNumber'
		})
	}
	const duplicatedEmail = await User.findOne({email}).exec()
	if (duplicatedEmail) {
		return res.status(401).json({
			message: 'there is already a user with this email',
			duplicated: 'email'
		})
	}
	try {
		password = await bcrypt.hash(password, 10)
		const users = await User.find().exec()
		const initialRole = users.length === 0 ? {SuperAdmin: 2004} : {User: 1998}
		let newUser = {username, password, roles: {...roles, ...initialRole}}
		await User.create({
			username,
			password,
			email,
			phoneNumber,
			roles: {
				...roles,
				...initialRole
			},
			lastActiveTime: format(new Date, 'MM/dd/yyyy\tHH:mm:ss')
		})
		res.status(201).json({'message': `new user ${username} succefully registered`})
	} catch(err) {
		console.error(err)
		if (err.code === 11000 && err.keyPattern && err.keyPattern.username === 1) {
			return res.status(401).json({
				message: 'there is already a user with this username',
				duplicated: 'username'
			})
			console.log('I have caught the error')
		}
		res.status(500).json({ message: `system error ${err.name}: ${err.message}`})
	}
}


module.exports = addNewUser

// const ragamDoria = 114152104