// eslint-disable-next-line import/extensions
import Navar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import React, { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className={`${inter.className} font-inter`}>
      <Navar />
      <section className="container mx-auto">{children}</section>
    </main>
  );
};
export default Layout;
