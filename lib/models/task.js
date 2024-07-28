import mongoose, { Schema } from 'mongoose';
export const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ['to-do', 'in-progress', 'under-review', 'finished'], // to restrict values and to ensure proper data entry
    default: 'to do',
    required: true,
  },
  priority: {
    type: String,
    enum: ['urgent', 'medium', 'low'],
    default: 'medium',
    required: true,
  },
  deadline: Date,
  description: String,
});

export default mongoose.models.Task || mongoose.model('Task', taskSchema);
