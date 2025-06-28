import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    work: {
      type: String,
      enum: [
        'personal', 'work', 'other', 'home', 'study', 'shopping', 'health',
        'travel', 'fitness', 'family', 'friends', 'hobby', 'entertainment', 'self-care',
      ],
      default: 'personal',
    },
    file: { type: String, required: false },

    // ✅ Add this:
    completed: { type: Boolean, default: false },

    // Optional fields you referenced in update
    tags: [String],
    dueDate: Date,
    attachments: [Object],
    category: { type: String }
  },
  { timestamps: true }
);

const todoModel = mongoose.model('Todo', todoSchema)
export default todoModel
