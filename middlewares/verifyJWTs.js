const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWTs = async (req, res, next) => {
	console.log(req.headers.authorization)
	let {authorization} = req.headers
	try {
		console.log(authorization)
		const decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET)
		req.user = decoded.username
		console.log('JWT verified')
		next()
	} catch(err) {
		console.log(`${err.name}: ${err.message}`)
		res.status(401).json({error: 'Un authorized', message: 'log in first'})
	}
}

module.exports = verifyJWTs