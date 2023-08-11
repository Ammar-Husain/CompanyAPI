const mongoose = require('mongoose')

const connectToMongo = async () => {
	console.log('Connecting to MongoDB ...')
	try {
		await mongoose.connect(process.env.DATABASE_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		console.log('Connected to MongoDB.')
	} catch(err) {
		console.log(err)
	}
}

module.exports = connectToMongo