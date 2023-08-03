require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(process.env.DATABASE_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.once('open', app)

async function app() {
	console.log('connected to mongoDB')
	const Test = new Schema({
		name: String
	})
	console.log('new schema defined')
	mySchema = mongoose.model('Test', Test)
	console.log('new schema created')
	await mySchema.create({
		name: "Ahmed"
	})
	console.log('person 1 created')
	await mySchema.create({
		name: "Ammar"
	})
	console.log('person  created')
	await mySchema.create({
		name: "Mohammed"
	})
	console.log('person 3 created')
	const result = await mySchema.find().exec()
	console.log(result)
}