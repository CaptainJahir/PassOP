"use client"
import React, { useRef } from 'react'
import Image from "next/image";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [Mode, setMode] = useState("/assets/light-mode.png");
    const [isDarkMode, setisDarkMode] = useState(false);
    const [showMore, setshowMore] = useState("hidden");
    const [moreImg, setMoreImg] = useState("/assets/more.png");
    const [webTheme, setwebTheme] = useState("Dark Mode");
    const handleMode = () => {
    setMode(previous => previous === "/assets/light-mode.png" ? "/assets/dark-mode.png": "/assets/light-mode.png");
    };

    useEffect(() => {
        if (isDarkMode) {
            // dark mode turned ON
          document.documentElement.classList.add('dark');
          setwebTheme("Light Mode");
        } else {
            // dark mode turned OFF
            document.documentElement.classList.remove('dark');
            setwebTheme("Dark Mode");
        }
    }, [Mode, isDarkMode]);
    
    useEffect(() => {
        if (Mode === "/assets/light-mode.png") {
            setisDarkMode(false);
        }else{
            setisDarkMode(true);
        }
    }, [Mode]);
    
      
    const moreBtn = () => {
      showMore === "hidden"? setshowMore("block"): setshowMore("hidden");
      moreImg === "/assets/more.png" ? setMoreImg("/assets/close.png") :setMoreImg("/assets/more.png"); 
    }
    
  return (
      <div>
        <div className="bg-slate-700 w-full h-[3.8rem] flex items-center justify-between fixed top-0 px-10 max-md:px-6 max-sm:px-6 dark:bg-[rgb(70,0,0)] z-20">
        
        {/* this displays small screen devices */}
        <div className='hidden max-md:block max-sm:block' onClick={() => {moreBtn()}}>
            <Image src={moreImg} width={24} height={24} alt="more" className='invert' loading='eager'/>
        </div>

        {/* Logo */}
        <Link href="/">
            <div className="font-bold text-white flex items-center cursor-pointer">
            <span className="text-green-500 text-2xl dark:text-red-500">&lt;</span>
            <span className="text-lg">
                Pass
                <span className="text-lg text-green-500 dark:text-red-500">OP</span>
            </span>
            <span className="text-green-500 text-lg dark:text-red-500">/&gt;</span>
            </div>
        </Link>
        {/* this displays on large screen devices */}
        <div className='flex items-center justify-center text-white font-semibold max-md:hidden max-sm:hidden'>
            {/* Home */}
            <Link href="/">
                <div className='cursor-pointer flex justify-center items-center gap-1 border w-28 py-1 rounded-full border-transparent hover:border-white'>
                    <Image src="/assets/home.png" alt="home" height={21} width={21} className='invert' loading='lazy'/>
                    <span>Home</span>
                </div>
            </Link>
            
            {/* Generate Password Button */}
            <Link href="/genpass">
                <div className='cursor-pointer flex justify-center items-center gap-1 border w-28 py-1 rounded-full border-transparent hover:border-white'>
                    <Image src="/assets/GenpassLogo.png" width={21} height={21} alt="genpass logo" className='invert' priority={false} loading='lazy'/>
                    <span>
                        GenPass
                    </span>
                </div>
            </Link>

            {/* Github Link */}
            <Link href="https://github.com/CaptainJahir/PassOP" prefetch={false}>
                <div className="flex items-center justify-around w-28 cursor-pointer rounded-full px-2 py-1 border border-transparent hover:border-white">
                    <Image src="/assets/github.ico" width={28} height={28} alt="github link" className='dark:invert'/>
                    <span>GitHub</span>
                </div>
            </Link>

            {/* Dark and Light Mode Button */}
            <div>
                <Image src={Mode} height={28} width={28} alt="modes" className='invert cursor-pointer' loading='eager' onClick={() => {handleMode()}}/>
            </div>

            </div>
        </div>

        <div className={`hidden bg-slate-600 fixed top-[3.8rem] w-full z-20 pb-2 max-md:${showMore} max-sm:${showMore}`}>
             {/* Home */}
             <Link href="/">
                <div className='pl-6 text-white font-semibold text-[1.05rem] cursor-pointer hover:bg-slate-500' onClick={() => {moreBtn();}}>
                    Home
                </div>
            </Link>
            
            {/* Generate Password Button */}
            <Link href="/genpass">
                <div className='pl-6 text-white font-semibold text-[1.05rem] cursor-pointer hover:bg-slate-500' onClick={() => {moreBtn();}}>
                    GenPass
                </div>
            </Link>

            {/* Github Link */}
            <Link href="https://github.com/CaptainJahir/PassOP" prefetch={false}>
                <div className='pl-6 text-white font-semibold text-[1.05rem] cursor-pointer hover:bg-slate-500' onClick={() => {moreBtn();}}>
                    GitHub
                </div>
            </Link>

            {/* Dark and Light Mode Button */}
            <div className='pl-6 text-white font-semibold text-[1.05rem] cursor-pointer hover:bg-slate-500' onClick={() => {handleMode(), moreBtn()}}>
                {webTheme}
            </div>
        </div>
      </div>
  )
}

export default Navbar
