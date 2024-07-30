import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import Task from '../../../../lib/models/task';

let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { taskId, newStatus } = body; 
  try {
    
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status: newStatus }, 
      { new: true } 
    );

    if (!updatedTask) {
      return NextResponse.json({ status: 401, message: 'Task not found' });
    }

    return NextResponse.json({ status: 200, task: updatedTask });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'An error occurred while updating the task' },
      { status: 500 }
    );
  }
}
