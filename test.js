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
	// await mySchema.create({
	// 	name: "Ammar"
	// })
	// console.log('i am loo')
	const result = await mySchema.findOne({name: 'Ammar'}).exec()
	console.log(result)
}