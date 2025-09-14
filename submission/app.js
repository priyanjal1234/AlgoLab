import cookieParser from 'cookie-parser'
import express from 'express'

import submissionRouter from './routes/submission.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/",submissionRouter)

export default app