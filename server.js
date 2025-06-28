import express from 'express';
import cors from 'cors';
import connectDb from './config/db.js';
import userRouter from './routes/user.js';
import todoRouter from './routes/todo.js';
import { protect } from './middleware/auth.js';
import serverlessExpress from '@vendia/serverless-express';

const app = express();

app.use(cors({
  origin: ['https://todo-app-software-based.vercel.app', 'http://localhost:8080'],
  credentials: true,
}));

app.use(express.json());
connectDb();

app.use('/api/auth', userRouter);
app.use('/api/todos', protect, todoRouter);

app.get('/', (req, res) => res.send('✅ Backend working'));

export default serverlessExpress({ app });
