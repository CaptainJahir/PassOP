import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const Passdesign = (props) => {
  return (
    <div className="py-1 px-2 grid grid-cols-[3fr_1fr_1fr_.6fr] gap-4 mb-2 bg-green-200">
      {/* Website URL */}
      <Link href={props.url} target='_blank'>
        <div className="flex justify-center items-center rounded-full font-semibold cursor-pointer  hover:bg-[rgb(181,255,181)] ">      
          {props.url}
        </div>
      </Link>

      <div className="flex justify-center items-center rounded-full font-semibold cursor-pointer hover:bg-[rgb(181,255,181)]">
        {props.username}
      </div>

      <div className="flex justify-center items-center rounded-full hover:bg-[rgb(181,255,181)]">
        <input type="password" className="bg-transparent outline-none text-center" value={props.passkey} readOnly />
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

