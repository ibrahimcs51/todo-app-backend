import express from 'express'
import { getMe, login, signup } from '../controllers/user.js'
import { protect } from '../middleware/auth.js'
const app = express.Router()

app.post('/login', login)
app.post('/register', signup)
app.get('/me', protect, getMe)


export default app//     const { email, password } = req.body;
//