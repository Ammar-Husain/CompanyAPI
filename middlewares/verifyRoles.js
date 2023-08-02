const verifyRoles = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req.roles) return res.status(401).json({message: 'You have to login first'})
		let userRoles = req.roles
		console.log(`user roles are ${userRoles}`)
		console.log(`the allowed roles are ${allowedRoles}`)
		if(!allowedRoles.find(role => userRoles.includes(role))) {
			return res.status(401).json({message: 'You don\'t have enough permisions to do this' }) 
		}
		next()
	}
}

module.exports = verifyRoles