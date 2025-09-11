import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Route Imports 
import userRouter from './routes/user.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use("/",userRouter)

export default app