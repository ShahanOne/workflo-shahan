import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import Task from '../../../../lib/models/task';
import User from '../../../../lib/models/user';
import checkUser from '@/lib/functions/checkUser';

let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req:Request) {
  const body = await req.json();
  const { userId } = body;

  const headers = req.headers; 
  const authHeader = headers.get('authorization');
    
  let user = null;

  try {
    user = await checkUser(authHeader);
  } catch (err) {
    return NextResponse.json({ status: 401, error: "User not logged in" });
  }

  try {
    const foundUser = await User.findOne({ _id: userId })
      .populate({path: 'tasks',model:Task})
      .exec();

    if (!foundUser) {
      return NextResponse.json({ status: 401, message: 'User not found' });
    }

    return NextResponse.json({ status: 200, user:foundUser,tasks: foundUser.tasks });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error, message:'An error occurred while fetching user tasks'},
      { status: 500 }
    );
  }
}
