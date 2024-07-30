import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { Providers } from '@/redux/Provider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Workflo Shahan',
  description: 'Workflo by Shahan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <link rel="icon" href="/task.ico" />
        </head>
        <body className={inter.className}>
          <ToastContainer />
          {children}
        </body>
      </html>
    </Providers>
  );
}
