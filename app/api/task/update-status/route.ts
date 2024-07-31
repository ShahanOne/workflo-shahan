import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import Task from '../../../../lib/models/task';
import checkUser from '@/lib/functions/checkUser';

let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { taskId, newStatus } = body; 

  const headers = req.headers; 
  const authHeader = headers.get('authorization');
    
  let user = null;

  try {
    user = await checkUser(authHeader);
  } catch (err) {
    return NextResponse.json({ status: 401, error: "User not logged in" });
  }

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
