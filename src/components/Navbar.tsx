'use client';

import React from 'react';
// import { usePathname } from 'next/navigation';
const Navar = () => {
  // const pathname = usePathname();
  return (
    <nav className="py-3 border-b">
      <div className={`flex items-center justify-between container mx-auto`}>
        <span className="flex gap-8 items-center">
          {/* <h1 className="font-bold text-2xl text-neutral-800">StockInsights</h1> */}
          <h3 className="text-sm cursor-pointer">News Feed</h3>
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
