import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// Route Imports 
import userRouter from './routes/user.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/",userRouter)

export default app