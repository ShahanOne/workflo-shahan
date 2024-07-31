import User from '@/lib/models/user.js';
import jwt from 'jsonwebtoken';

const checkUser = async (authHeader) => {
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw Error('No token provided');
  }

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      throw Error('User not found');
    }

    return user;
  } catch (error) {
    console.log(error);
    throw Error('Failed to authenticate token.');
  }
};

export default checkUser;
