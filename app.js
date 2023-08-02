require('dotenv').config()
const express = require('express')
const path = require ('path')
const cors = require('cors')
const corsOptions = require('./configs/corsOptions')
const cookieParser = require('cookie-parser')
const {eventslogger} = require(path.join(__dirname, 'middlewares', 'logEvents.js'))
const {errorslogger} = require(path.join(__dirname, 'middlewares', 'logEvents.js'))
const verifyJWTs = require(path.join(__dirname, 'middlewares', 'verifyJWTs.js'))
const handleOptionsRequests = require(path.join(__dirname, 'middlewares', 'handleOptionsRequests.js'))
const employeesRouter = require(path.join(__dirname, 'routes', 'api', 'employees.js'))
const registerRouter = require(path.join(__dirname, 'routes', 'api', 'register.js'))
const authRouter = require(path.join(__dirname, 'routes', 'api', 'auth.js'))
const logoutRouter = require(path.join(__dirname, 'routes', 'api', 'logout.js'))
const refreshRouter = require(path.join(__dirname, 'routes', 'api', 'refreshToken.js'))
const app = express()

app.use(eventslogger)
app.use(handleOptionsRequests)
app.use(cors(corsOptions))

app.use(cookieParser())

app.use(express.urlencoded({ extended: false }));
app.use(express.json())


app.use('/login', authRouter)
app.use('/refresh', refreshRouter)
app.use('/register', registerRouter)


app.use(verifyJWTs)

app.use('/logout', logoutRouter)
app.use('/employees', employeesRouter)

app.use((req, res) => {
	res.json({error: '404 not found', url: req.url})
})

const PORT = process.env.PORT || 3500
app.use(errorslogger)
app.listen(PORT, () => {
	console.log(`server run on port ${PORT}`)
})