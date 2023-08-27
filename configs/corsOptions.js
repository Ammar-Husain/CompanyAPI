// const whitelist = ['http://localhost:7700', 'http://localhost:3000']
const corsOptions = {
	origin: (origin, callback) => callback(null, true),
	// origin: (origin, callback) => {
	// 	whitelist.find(site => site === origin) || !origin ? callback(null, true) : callback(new Error('no Permissions'))
	// },
	'Access-Control-Allow-Credentials' :true,
	optionsSuccessesStatus: 200,
}

module.exports = corsOptions