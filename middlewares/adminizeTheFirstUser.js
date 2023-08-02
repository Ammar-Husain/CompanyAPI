const path = require('path')
const fsp = require('fs').promises

const adminizeTheFirstUser = async (req, res, next) => {
	const jsonData = await fsp.readFile(path.join(__dirname, '..', 'model', 'users.json'))
	const users = JSON.stringify(jsonData)
	if (!users.length) addNewUser(req, res)
	else next()
}

module.exports = adminizeTheFirstUser