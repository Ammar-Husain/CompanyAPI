const path = require('path')
const fs = require('fs')
const fsp = require('fs').promises
const {v4:uuid} = require('uuid')
const {format} = require('date-fns')
const Emitter = require('events')
class MyEmitter extends Emitter{}
const myEmitter = new MyEmitter()

myEmitter.on('log', async (data, file) => {
	try {
		if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
			await fsp.mkdir(path.join(__dirname, '..', 'logs'))
		}
		if(!fs.existsSync(path.join(__dirname, '..', 'logs', file))) {
			await fsp.writeFile(path.join(__dirname, '..', 'logs', file), '')
		}
		const dateTime = format(new Date, 'MM/dd/yyyy\tHH:mm:ss')
		const id = uuid()
		const newLog = `${dateTime}\t${data}\t${id}\n`
		await fsp.appendFile(path.join(__dirname, '..', 'logs', file), newLog)
	} catch(err) {
		console.error(err)
	}
})

const eventslogger = (req, res, next) => {
	myEmitter.emit('log', `${req.url}\t${req.method}\t${req.headers.origin}`, 'logs.txt')
	next()
}
const errorslogger = (err, req, res) => {
	console.error(err.stack)
	myEmitter.emit('log', `${req.url}\t${err.name}: ${err.message}`, 'errors.txt')
	// res.status(500).send(err.message)
	res.json({ message: `${err.name}: ${err.message}`})
}

module.exports = {eventslogger, errorslogger}