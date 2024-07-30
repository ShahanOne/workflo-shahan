'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Register = () => {
  const router = useRouter();
  let userId: string | null = null;

  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('__uid');
  }

  useEffect(() => {
    if (!userId) {
      router.push('/register');
    } else {
      router.push('/home');
    }
  }, [router]);
  return (
    <div className="h-screen flex gap-2 justify-center items-center text-center bg-gradient-to-b from-[#ffffff] to-[#b0a3ff]">
      Redirecting <span className=" animate-ping ">o</span>
    </div>
  );
};

export default Register;
