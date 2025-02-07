import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
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

  const handleDelete = () => {
    dispatch(removeitem(props.slno-1));
    toast.success("Deleted Sucessfully");
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
    <div className="py-1 px-2 grid grid-cols-[40px_3fr_1fr_1fr_.6fr] gap-4 mb-2 bg-green-200">
      <span className='flex justify-center items-center cursor-pointer font-semibold rounded-full hover:bg-[rgb(181,255,181)]'>
        {/* here props serial number starts from 1,2,3... not from 0,1,2,3... mind it */}
        {props.slno}
      </span>
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
          <Image src="/assets/Edit.png" alt="revel" width={28} height={28} className="cursor-pointer" onClick={() => {handleEdit()}}/>
        </span>

        <span>
          <Image src="/assets/Delete.png" alt="revel" width={28} height={28} className="cursor-pointer" onClick={() => {handleDelete()}}/>
        </span>
       
      </div>
    </div>
  )
}

export default Passdesign

