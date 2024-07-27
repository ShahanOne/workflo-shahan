import mongoose, { Schema } from 'mongoose';
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

export default mongoose.models.User || mongoose.model('User', userSchema);
