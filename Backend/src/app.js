const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())

// requiring routes
const authRouter = require('./routes/auth.routes')

// using routes
app.use('/api/auth', authRouter)

module.exports = app