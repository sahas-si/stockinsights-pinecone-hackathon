'use client';

import React from 'react';
// import { usePathname } from 'next/navigation';
const Navar = () => {
  // const pathname = usePathname();
  return (
    <nav className="py-3 border-b bg-[#f7fbfd]">
      <div
        className={`flex items-center justify-between container mx-auto max-w-[888px]`}
      >
        <span className="flex gap-8 items-center">
        <img src="/si_logo.svg" alt="logo" className="!w-6" />
          <h1 className="font-bold text-2xl text-neutral-800">StockInsights</h1>
        </span>
        <span>
          {/* <h2 className="border shadow-sm bg-white px-4 py-1 rounded-md cursor-pointer">
            Login
          </h2> */}
        </span>
      </div>
    </nav>
  );
};

export default Navar;
