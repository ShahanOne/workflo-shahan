import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import bcrypt from 'bcrypt';
import User from '../../../../lib/models/user';
import jwt from 'jsonwebtoken';

let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req: Request) {
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
    const secret = process.env.JWT_SECRET;
    // if (!secret) {
    //   return NextResponse.json({ status: 401, message: 'Secret not provided' });
    // }
    const token = jwt.sign(
      { userId: foundUser._id, username: foundUser.username },
      secret,
      { expiresIn: '24h' }
    );

    return NextResponse.json({ status: 200, user: foundUser, token });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: 'Error logging User',
      error: error,
    });
  }
}
