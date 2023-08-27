const path = require ('path')
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
connectToMongo = require(path.join(__dirname, 'configs', 'connectToMongo'))
const cors = require('cors')
const corsOptions = require('./configs/corsOptions')
const cookieParser = require('cookie-parser')
const {eventslogger} = require(path.join(__dirname, 'middlewares', 'logEvents'))
const {errorslogger} = require(path.join(__dirname, 'middlewares', 'logEvents'))
const verifyJWTs = require(path.join(__dirname, 'middlewares', 'verifyJWTs'))
const handleOptionsRequests = require(path.join(__dirname, 'middlewares', 'handleOptionsRequests'))
const employeesRouter = require(path.join(__dirname, 'routes', 'api', 'employees'))
const usersRouter = require(path.join(__dirname, 'routes', 'api', 'users'))

const app = express()
connectToMongo()

app.use(eventslogger)
app.options(handleOptionsRequests)
app.use(cors(corsOptions))

app.use(cookieParser())

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use('/users', usersRouter)

app.use(verifyJWTs)

app.use('/employees', employeesRouter)

app.use((req, res) => {
	res.json({ message: '404 not found', url: req.url})
})

const PORT = process.env.PORT || 3500
app.use(errorslogger)

mongoose.connection.once('open', () => {
	app.listen(PORT, () => {
		console.log(`server run on port ${PORT}`)
	})
})