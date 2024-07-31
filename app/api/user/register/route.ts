import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectDB } from '../../../../utils/db';
import User from '../../../../lib/models/user';
import jwt from "jsonwebtoken";

let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req:Request) {
  const body = await req.json();
  const { username, email, password } = body[0];
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username: username,
      email: email,
      password: hash,
    });

    const savedUser = await user.save();
        const token = jwt.sign(
						{ userId: savedUser._id, username: savedUser.username },
						process.env.JWT_SECRET,
						{ expiresIn: "24h" }
					);
    return NextResponse.json({
      status: 200,
      token,
      user: savedUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: 'Error creating User',
      error: error,
    });
  }
}
