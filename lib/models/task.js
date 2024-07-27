import mongoose, { Schema } from 'mongoose';
export const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  deadline: Date,
  description: String,
});

export default mongoose.models.Task || mongoose.model('Task', taskSchema);
