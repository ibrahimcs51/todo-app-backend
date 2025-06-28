
// @desc    Create a new todo
// @route   POST /api/todos

import todoModel from "../models/todoSchema.js"

// @access  Public (or Protected)
export const createTodo = async (req, res) => {
  try {
    const { title, description, priority, work, file } = req.body
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required.' })
    }

    const newTodo = await todoModel.create({
      title,
      description,
      priority,
      work,
      file,
    })
    res.status(201).json(newTodo)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error.' })
  }
}

//  Get all todos
//  GET /api/todos
//  Public (or Protected)
export const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.find()
    res.status(200).json(todos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error.' })
  }
}

// @desc    Get single todo by ID
// @route   GET /api/todos/:id
// @access  Public (or Protected)
export const getTodoById = async (req, res) => {
  try {
    const todo = await todoModel.findById(req.params.id)
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found.' })
    }
    res.status(200).json(todo)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error.' })
  }
}

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Public (or Protected)
export const updateTodo = async (req, res) => {
  console.log('🛠️ Update Payload:', req.body);

  try {
    const {
      title,
      description,
      priority,
      work,
      file,
      tags,
      dueDate,
      attachments,
      category,
      completed // ✅ include this
    } = req.body;

    const todo = await todoModel.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.priority = priority ?? todo.priority;
    todo.work = work ?? todo.work;
    todo.file = file ?? todo.file;
    todo.tags = tags ?? todo.tags;
    todo.dueDate = dueDate ?? todo.dueDate;
    todo.attachments = attachments ?? todo.attachments;
    todo.category = category ?? todo.category;
    todo.completed = typeof completed === 'boolean' ? completed : todo.completed; // ✅

    const updated = await todo.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error('❌ Update Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};


// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Public (or Protected)
export const deleteTodo = async (req, res) => {
  try {
    const todo = await todoModel.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    res.status(200).json({ message: 'Todo removed.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
