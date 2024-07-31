'use client';
import AuthForm from '@/components/AuthForm';
import setCookie from '@/lib/functions/setCookie';
import { setUser } from '@/redux/slices/appSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Login = () => {
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

  const handleLogin = async (
    fullname: string,
    email: string,
    password: string
  ) => {
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    }
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ email, password }]),
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
            toast.error('User not found, check username/password or register');
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-screen flex justify-center pb-28 items-center text-center bg-gradient-to-b from-[#ffffff] to-[#b0a3ff]">
      <AuthForm
        formType="login"
        linkText="Create a new account."
        handleAuthentication={handleLogin}
      />
    </div>
  );
};

export default Login;
