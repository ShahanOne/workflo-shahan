import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import bcrypt from 'bcrypt';
import User from '../../../../lib/models/user';
let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req:Request) {
  const body = await req.json();
  const { email, password } = body[0];
  try {
    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      return NextResponse.json({ status: 401, message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json({ status: 401, message: 'Incorrect password' });
    }

    return NextResponse.json({ status: 200, user: foundUser });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: 'Error logging User',
      error: error,
    });
  }
}
