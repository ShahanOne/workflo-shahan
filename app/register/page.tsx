'use client';
import AuthForm from '@/components/AuthForm';
import getCookie from '@/lib/functions/getCookie';
import { setUser } from '@/redux/slices/appSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import setCookie from '@/lib/functions/setCookie';
const Register = () => {
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = (email: string) => emailRegex.test(email);
  const dispatch = useDispatch();

  let userId: string | null = null;

  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('__uid');
  }
  useEffect(() => {
    if (userId) {
      router.push('/home');
    }
  }, [router, userId]);

  const token = getCookie('token');

  const handleRegister = async (
    fullname: string,
    email: string,
    password: string
  ) => {
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    }
    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify([{ username: fullname, email, password }]),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.user) {
            typeof window !== 'undefined' &&
              localStorage.setItem('__uid', data.user._id);
            setCookie('token', data.token, 10);
            dispatch(setUser(data.user));

            router.push('/home');
          } else {
            toast.error('Error trying to register, please try again');
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-screen flex justify-center pb-28 items-center text-center bg-gradient-to-b from-[#ffffff] to-[#b0a3ff]">
      <AuthForm
        formType="register"
        linkText="Log in"
        handleAuthentication={handleRegister}
      />
    </div>
  );
};

export default Register;
