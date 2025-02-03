import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useState } from 'react'


const Passdesign = (props) => {
  const urlRef = useRef()
  const userRef = useRef()
  const passRef = useRef()
  const [pass, setpass] = useState(props.passkey)

  const savefunction = async (source) => {
    try {
      await navigator.clipboard.writeText(source)
      alert("Copied Sucessfully")
    } catch (error) {
      alert("Copy Failed")
    }
  }
  const copyurl = () => {
    savefunction(urlRef.current.innerText)
  }

  const copyuser = async () => {
    savefunction(userRef.current.innerText)
  }

  const copypass = async () => {
    savefunction(pass)
  }

  return (
    <div className="py-1 px-2 grid grid-cols-[3fr_1fr_1fr_.6fr] gap-4 mb-2 bg-green-200">
      {/* Website URL */}
      {/* This is a Main Container */}
      <div className='grid grid-cols-[1fr_40px]'>
      <Link href={props.url} target='_blank'>
        <div className="flex justify-center items-center rounded-full font-semibold cursor-pointer hover:bg-[rgb(181,255,181)]" ref={urlRef}>      
          {props.url}
        </div>
      </Link>

      {/* Here Goes the copy button */}
      
      <Image src="/assets/Copy.png" alt="revel" width={28} height={28} className="cursor-pointer" onClick={() => {copyurl()}}/>
      </div>

      {/* Username container */}
      <div className='grid grid-cols-[1fr_40px]'>
        <div className="flex justify-center items-center rounded-full font-semibold cursor-pointer hover:bg-[rgb(181,255,181)]" ref={userRef}>
          {props.username}
        </div>

        {/* Here Goes the copy button */}
      
        <Image src="/assets/Copy.png" alt="revel" width={28} height={28} className="cursor-pointer" onClick={() => {copyuser()}}/>
      </div>

      {/* Here Goes the Password */}
      <div className='grid grid-cols-[1fr_40px]'>
        <div className="flex justify-center items-center rounded-full hover:bg-[rgb(181,255,181)]" ref={passRef}>
          <input type="password" className="bg-transparent outline-none text-center cursor-pointer" value={props.passkey} readOnly />

          {/* Here Goes the copy button */}
      
        <Image src="/assets/Copy.png" alt="revel" width={28} height={28} className="cursor-pointer" onClick={() => {copypass()}}/>
        </div>
      </div>

        {/* Edit and Delete Option */}
      <div className="flex justify-center gap-3 items-center hover:bg-[rgb(181,255,181)]">
        <span>
          <Image src="/assets/Edit.png" alt="revel" width={28} height={28} className="cursor-pointer" />
        </span>

        <span>
          <Image src="/assets/Delete.png" alt="revel" width={28} height={28} className="cursor-pointer" />
        </span>
       
      </div>
    </div>
  )
}

export default Passdesign

