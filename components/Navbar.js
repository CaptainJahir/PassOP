"use client"
import React from 'react'
import Image from "next/image";
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [Mode, setMode] = useState("/assets/light-mode.png");
    const handleMode = () => {
    setMode(previous => previous === "/assets/light-mode.png" ? "/assets/dark-mode.png": "/assets/light-mode.png");
    };
      
  return (
      <div className="bg-slate-700 w-full h-[3.8rem] flex items-center justify-between px-10 xs:bg-red-600">
        {/* Logo */}
        <div className="font-bold text-white flex items-center cursor-pointer">
          <span className="text-green-500 text-2xl">&lt;</span>
          <span className="text-lg">
            Pass
            <span className="text-lg text-green-500">OP</span>
          </span>
          <span className="text-green-500 text-lg">/&gt;</span>
        </div>

        <div className='flex items-center justify-center gap-1 text-white font-semibold'>
            {/* Generate Password Button */}
            <Link href="/genpass">
                <div className='cursor-pointer flex justify-center items-center gap-1 border w-28 py-1 rounded-full border-transparent hover:border-white'>
                    <Image src="/assets/Genpass-Logo.png" width={21} height={21} alt="github link" className='invert' />
                    <span>
                        GenPass
                    </span>
                </div>
            </Link>

            {/* Github Link */}
            <Link href="https://github.com/">
                <div className="flex items-center justify-around w-28 cursor-pointer rounded-full px-2 py-1 border border-transparent hover:border-white">
                    <Image src="/assets/github.ico" width={28} height={28} alt="github link" />
                    <span>GitHub</span>
                </div>
            </Link>

            {/* Feedback button */}
            <Link href="/feedback">
                <div className='border px-6 rounded-full py-1 border-transparent hover:border-white cursor-pointer'>
                    Feedback
                </div>
            </Link>

            {/* Dark and Light Mode Button */}
            <div>
                <Image src={Mode} height={28} width={28} alt="modes" className='invert cursor-pointer' onClick={() => {handleMode()}}/>
            </div>

        </div>
      </div>
  )
}

export default Navbar
