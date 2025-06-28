import express from 'express';
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from '../controllers/todo.js';

const router = express.Router(); // ✅ Not `app`

router.post('/create', createTodo);
router.get('/', getTodos);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo); // ✅ Now correctly defined

export default router;

