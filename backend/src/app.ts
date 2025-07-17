import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import database from './Db/mongodb';
import userRoutes from './routes/user.route'

dotenv.config()
database();
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.CLIENT_URL || 'none',
    credentials: true,
}))

app.use('/user',userRoutes)

app.get('/',(req: Request,res: Response)=>{
    res.send('hello')
})

export default app