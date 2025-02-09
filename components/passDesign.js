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
    <div className="py-1 px-2 grid grid-cols-[.2fr_2fr_1fr_.8fr_.6fr] gap-4 mb-2 bg-green-200 max-xs:grid-cols-[1.2fr_1fr_1fr_.6fr] max-xs:gap-1">
      <span className='flex justify-center items-center cursor-pointer font-semibold rounded-full hover:bg-[rgb(181,255,181)] max-xs:hidden'>
        {/* here props serial number starts from 1,2,3... not from 0,1,2,3... mind it */}
        {props.slno}
      </span>
      {/* Website URL */}
      <div className='grid grid-cols-[1fr_.1fr] gap-1 w-full place-content-between truncate max-xs:flex max-xs:justify-start'>
      <Link href={props.url} target='_blank'>
        <div className="flex justify-start items-center w-[25rem] font-semibold truncate cursor-pointer px-1 hover:bg-[rgb(181,255,181)] pl-2" ref={urlRef} onTouchStart={() => {TouchStart(props.url)}} onTouchEnd={() => {TouchEnd()}}>      
          {props.url}
        </div>
      </Link>

      {/* Here Goes the copy button */}
      
      <Image src="/assets/Copy.png" alt="revel" width={28} height={28} className="cursor-pointer max-xs:hidden" onClick={() => {copyurl()}}/>
      </div>

      {/* Username container */}
      <div className='grid grid-cols-[1fr_.3fr] gap-4 max-xs:flex'>
        <div className="flex justify-start items-center rounded-full font-semibold cursor-pointer max-xs:w-14 px-1 max-xs:justify-start truncate hover:bg-[rgb(181,255,181)]" ref={userRef} onTouchStart={() => {TouchStart(props.username)}} onTouchEnd={() => {TouchEnd()}}>
          {props.username}
        </div>

        {/* Here Goes the copy button */}
      
        <Image src="/assets/Copy.png" alt="revel" width={28} height={28} className="cursor-pointer max-xs:hidden" onClick={() => {copyuser()}}/>
      </div>

      {/* Here Goes the Password */}
      <div className='grid grid-cols-[1fr_.5fr] gap-6 max-xs:flex'>
        <div className="flex justify-center items-center rounded-full pl-[3rem] truncate hover:bg-[rgb(181,255,181)] max-xs:w-16" ref={passRef} onTouchStart={() => {TouchStart(props.passkey)}} onTouchEnd={() => {TouchEnd()}}>
          <input type="password" className="bg-transparent outline-none  pl-12 cursor-pointer" value={props.passkey} readOnly />
        </div>
          {/* Here Goes the copy button */}
        <Image src="/assets/Copy.png" alt="revel" width={28} height={28} className="cursor-pointer" onClick={() => {copypass()}}/>
      </div>

        {/* Edit and Delete Option */}
      <div className="flex justify-center gap-3 items-center hover:bg-[rgb(181,255,181)] max-xs:w-12 max-xs:gap-1">
        <span>
          {/* <Image src="/assets/Edit.png" alt="revel" width={28} height={28} className="cursor-pointer" onClick={() => {handleEdit()}}/> */}
          <div className='bg-[rgb(12,162,240)] text-white w-[4rem] text-lg font-semibold rounded-md py-[.1rem] flex justify-center items-center cursor-pointer' onClick={() => {handleEdit()}}>
            Edit
          </div>
        </span>

        <span>
          {/* <Image src="/assets/Delete.png" alt="revel" width={28} height={28} className="cursor-pointer" onClick={() => {handleDelete()}}/> */}
          <div className='bg-red-600 text-white text-lg font-semibold rounded-md flex justify-center items-center px-3 py-[.1rem] cursor-pointer' onClick={() => {handleDelete()}}>
            Delete
          </div>
        </span>
       
      </div>
    </div>
  )
}

export default Passdesign

