import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import database from './Db/mongodb';
import userRoutes from './routes/user.route'
import productRoutes from './routes/product.route'
import cartRoutes from './routes/cart.route'

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
app.use('/product',productRoutes)
app.use('/cart',cartRoutes)

app.get('/',(req: Request,res: Response)=>{
    res.send('hello')
})

export default app