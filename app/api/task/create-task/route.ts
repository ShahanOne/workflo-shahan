import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import Task from '../../../../lib/models/task';
import User from '../../../../lib/models/user';

let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, title, status, priority, deadline, description } = body[0];
  try {
    const newTask = new Task({
      title,
      status,
      priority,
      deadline,
      description,
    });

    const savedTask = await newTask.save();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: savedTask._id } },
      { new: true }
    ).populate('tasks');

    return NextResponse.json({
      status: 200,
      message: 'Task added successfully',
      task: savedTask,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'An error occurred while adding Task' },
      { status: 500 }
    );
  }
}
