// api/index.js
import express from 'express'
import connectDb from '../config/db.js'
import userRouter from '../routes/user.js'
import todoRouter from '../routes/todo.js'
import { protect } from '../middleware/auth.js'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: ['http://localhost:8080', 'https://todo-app-software-based.vercel.app'],
  credentials: true
}))

app.use(express.json())
connectDb()

app.use('/api/auth', userRouter)
app.use('/api/todos', protect, todoRouter)

app.get('/', (req, res) => {
  res.send('Hello from Vercel Express API!')
})

export default app
