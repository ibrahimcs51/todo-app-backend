import express from 'express'
import connectDb from './config/db.js'
import userRouter from './routes/user.js'
import todoRouter from './routes/todo.js'
import { protect } from './middleware/auth.js'
import cors from 'cors'
const app = express()



app.use(cors(
  {
    origin: 'https://todo-app-software-based.vercel.app'|| 'http://localhost:8080', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  }
))
const PORT = process.env.PORT || 3000
app.use(express.json())
connectDb()

// Register user routes
app.use('/api/auth', userRouter)

// app.use(protect)

app.use('/api/todos', protect, todoRouter)
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.use('/check',(req, res) => {
  res.send('Server is running and connected to MongoDB!')
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
