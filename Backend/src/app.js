const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'https://interview-gen-ai-project.vercel.app',
    credentials:true
}))

// requiring routes
const authRouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes')

// using routes
app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)

module.exports = app