'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface AuthFormProps {
  formType: 'login' | 'register'; // Restrict to these string values
  linkText: string;
  handleAuthentication: (
    fullName: string,
    email: string,
    password: string
  ) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  formType,
  linkText,
  handleAuthentication,
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [clicked, setClicked] = useState(false);

  const router = useRouter();

  return (
    <div className="flex flex-col md:w-[35%] w-[90%] gap-4 bg-gradient-to-b from-[#f7f7f7] to-[#f0f0f0] justify-center rounded-lg shadow px-8 py-12">
      <p className="md:text-4xl text-2xl">
        Welcome to <span className="text-[#4634ac]">Workflo</span>!
      </p>
      {formType === 'register' && (
        <input
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="rounded bg-[#ebebeb] text-[#777676] outline-none p-2"
        />
      )}
      <input
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded bg-[#ebebeb] text-[#777676] outline-none p-2"
      />
      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="rounded bg-[#ebebeb] text-[#777676] outline-none p-2"
      />

      <button
        onClick={() => {
          setClicked(true);
          formType === 'login'
            ? handleAuthentication('', email, password)
            : handleAuthentication(fullName, email, password);
        }}
        className="bg-gradient-to-t from-[#7d6fd1] to-[#877dcc]  p-2 text-white rounded-lg "
      >
        <p className={clicked ? 'animate-pulse' : ''}>
          {formType === 'login' ? 'Login' : 'Sign up'}
        </p>{' '}
      </button>
      <p className="text-sm">
        {formType === 'login' ? "Don't" : 'Already'} have an account?{' '}
        <span
          onClick={() =>
            formType === 'login'
              ? router.push('/register')
              : router.push('/login')
          }
          className="text-[#0154a1] cursor-pointer"
        >
          {linkText}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;
