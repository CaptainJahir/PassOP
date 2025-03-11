import React from 'react'
import Image from 'next/image'
import { useRef , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeitem } from '@/redux/slice/ArraySlice'
import { addEdit, removeall } from "@/redux/slice/EditSlice";
import { toast } from 'react-toastify'


const Passdesign = (props) => {
  const urlRef = useRef();
  const userRef = useRef();
  const passRef = useRef();
  const [pass, setpass] = useState(props.passkey);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.CredentialArray.items);
  const edititems = useSelector(state => state.Editarray.value);
  // copy button for mobiles

  let timer;
  const TouchStart = (copyElement) => {
    timer = setTimeout(() => {
      navigator.clipboard.writeText(copyElement);
      toast.success("Copied Sucessfully");
    }, 1000);
  }
  const TouchEnd = () => {
    clearTimeout(timer);
  }

  const savefunction = async (source) => {
    try {
      await navigator.clipboard.writeText(source)
    } catch (error) {
      toast.error("Copy Failed")
    }
  }
  const copyurl = () => {
    savefunction(urlRef.current.innerText)
    toast.info("Copied Url Sucessfully")
  }

  const copyuser = async () => {
    savefunction(userRef.current.innerText)
    toast.info("Copied User Sucessfully")
  }

  const copypass = async () => {
    savefunction(pass)
    toast.info("Copied Password Sucessfully")
  }

  const handleDelete = async () => {
    let a = await fetch("http://localhost:3001/delete", {
      method:"DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items[props.slno-1])
    })
    let res = await a.json();
      console.log(res);
      dispatch(removeitem(props.slno-1));
      toast.success("Deleted Sucessfully");
    console.log(items[props.slno-1]);
  }

  const handleEdit = () => {
    if (edititems.length === 0) {
      dispatch(addEdit(items[props.slno-1]));
      dispatch(removeitem(props.slno-1));
    }else{
      dispatch(removeall())
      dispatch(addEdit(items[props.slno-1]));
      dispatch(removeitem(props.slno-1));
    }
    toast.info("Edit mode activated ")
  }
  
  
  

  return (
    <div className="py-1 px-2 grid grid-cols-[.2fr_2fr_1fr_.8fr_1.15fr] gap-4 mb-2 bg-green-200 dark:bg-black max-md:grid-cols-[1fr_1fr_1fr_.6fr] max-md:gap-1">
      <span className='flex justify-center items-center cursor-pointer font-semibold rounded-full hover:bg-[rgb(181,255,181)] dark:hover:bg-slate-900 max-md:hidden'>
        {/* here props serial number starts from 1,2,3... not from 0,1,2,3... mind it */}
        {props.slno}
      </span>
      {/* Website URL */}
      <div className='grid grid-cols-[1fr_.3fr] gap-4 max-md:flex max-md:w-[90%] truncate md:grid-cols-[1fr_0.2fr] md:gap-2'>
        <div className="flex items-center rounded-full font-semibold cursor-pointer dark:hover:bg-slate-900 dark:rounded-full dark:py-1 max-md:w-full truncate hover:bg-[rgb(181,255,181)]" ref={urlRef} onTouchStart={() => {TouchStart(props.url)}} onTouchEnd={() => {TouchEnd()}}>
          {props.url}
        </div>

        {/* Here Goes the copy button */}
      
        <Image src="/assets/Copy.png" alt="copy" width={28} height={28} className="cursor-pointer dark:invert max-md:hidden" loading='lazy' onClick={() => {copyurl()}}/>
      </div>

      {/* Username container */}
      <div className='grid grid-cols-[1fr_.3fr] gap-4 max-md:flex max-md:w-[90%] truncate md:grid-cols-[1fr_0.8fr] md:gap-1'>
        <div className="flex items-center rounded-full font-semibold cursor-pointer dark:hover:bg-slate-900 dark:rounded-full dark:py-1 max-md:w-full truncate hover:bg-[rgb(181,255,181)]" ref={userRef} onTouchStart={() => {TouchStart(props.username)}} onTouchEnd={() => {TouchEnd()}}>
          {props.username}
        </div>

        {/* Here Goes the copy button */}
      
        <Image src="/assets/Copy.png" alt="copy" width={28} height={28} className="cursor-pointer dark:invert max-md:hidden" loading='lazy' onClick={() => {copyuser()}}/>
      </div>

      {/* Here Goes the Password */}
      <div className='grid grid-cols-[1fr_.5fr] gap-6 max-md:flex md:grid-cols-[1fr_0.8fr] md:gap-1'>
        <div className="flex justify-center items-center rounded-full truncate hover:bg-[rgb(181,255,181)] dark:hover:bg-slate-900 dark:rounded-full dark:py-1 max-md:w-[90%]" ref={passRef} onTouchStart={() => {TouchStart(props.passkey)}} onTouchEnd={() => {TouchEnd()}}>
          <input type="password" className="bg-transparent outline-none cursor-pointer w-full" value={props.passkey} readOnly />
        </div>
          {/* Here Goes the copy button */}
        <Image src="/assets/Copy.png" alt="copy" width={28} height={28} className="cursor-pointer dark:invert max-md:hidden" loading='lazy' onClick={() => {copypass()}}/>
      </div>

        {/* Edit and Delete Option */}
      <div className="flex justify-center gap-3 w-full items-center hover:bg-[rgb(181,255,181)] dark:hover:bg-black dark:rounded-full dark:py-1 max-md:gap-1">
        <span>
          <Image src="/assets/Edit.png" alt="revel" width={28} height={28} className="cursor-pointer hidden max-md:block dark:invert" loading='lazy' onClick={() => {handleEdit()}}/>
          <div className='bg-[rgb(12,162,240)] text-white w-[4rem] text-lg font-semibold rounded-md py-[.1rem] flex justify-center items-center cursor-pointer max-md:hidden' onClick={() => {handleEdit()}}>
            Edit
          </div>
        </span>

        <span>
          <Image src="/assets/Delete.png" alt="revel" width={28} height={28} className="cursor-pointer hidden max-md:block dark:invert" loading='lazy' onClick={() => {handleDelete()}}/>
          <div className='bg-red-600 text-white text-lg font-semibold rounded-md flex justify-center items-center px-3 py-[.1rem] cursor-pointer max-md:hidden' onClick={() => {handleDelete()}}>
            Delete
          </div>
        </span>
       
      </div>
    </div>
  )
}

export default Passdesign

