"use client"
import Image from "next/image";
import Passdesign from "@/components/passDesign";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { additem } from '@/redux/slice/ArraySlice'
import { ToastContainer , toast } from "react-toastify";
import Feedback from "@/components/feedback";

export default function Home() {
  const [img, setimg] = useState("/assets/show.png");
  const [inptype, setinptype] = useState("password");
  const webnameRef = useRef();
  const usernameRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.CredentialArray.items);
  const edititems = useSelector(state => state.Editarray.value);
  

  const editFunction = () => {
    if (edititems.length !== 0) {
      webnameRef.current.value = edititems[0].website
      usernameRef.current.value = edititems[0].user
      passRef.current.value = edititems[0].pass
    }
  }

  useEffect(() => {
    editFunction();
  }, [edititems])
  

  const handleSave = () => {
    const webname = webnameRef.current.value;
    const username = usernameRef.current.value;
    const password = passRef.current.value;
    // this data is in the form of JSON
    const inputData = {
      website: webname ,
      user: username , 
      pass: password
    }
    if(inputData.web !== "" && inputData.user !== "" && inputData.pass !== ""){
      dispatch(additem(inputData))
      webnameRef.current.value = "";
      usernameRef.current.value = ""
      passRef.current.value = "";
      toast.success("Saved Sucessfully")

    }
    else{
      // alert("The input fieds must not be empty")
      toast.error("Input Fields Must not be Empty");
    }
  }
  

  const toggleBtn = () => {
    if (img === "/assets/show.png") {
      setimg("/assets/hide.png")
      setinptype("text")
    }
    else{
      setimg("/assets/show.png")
      setinptype("password")
    }
  }
  
  return (
    <div className="bg-green-100 w-[100vw] overflow-x-hidden">
      <Feedback />
      {/* this is a more div container available in small screen devices */}
      <div className='bg-gray-100 z-10 h-30 hidden'>
            <ul className="bg-[rgb(24,80,103)] text-white px-3">
              <li>
                {/* <Image height={24} width={24} src="/assets/Genpass-Logo.png" alt="" /> */}
                <span>GenPass</span>
              </li>
              <li>GitHub</li>
              <li>Feedback</li>
              <li>Dark Mode</li>
            </ul>
        </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover pauseOnFocusLoss draggable theme="colored"/>

      {/* Body Goes here */}

      <div className="mt-[6rem]">
        {/* here goes the logo and its tag line */}
        <div className="flex flex-col justify-center items-center my-6">
          {/* here goes the logo */}
          <div>
            <div className="font-bold text-black flex items-center cursor-pointer">
              <span className="text-green-600 text-5xl max-xs:text-2xl">&lt;</span>
              <span className="text-4xl max-xs:text-2xl">
                Pass
                <span className="text-4xl text-green-600 max-xs:text-2xl">OP</span>
              </span>
              <span className="text-green-600 text-4xl max-xs:text-2xl">/&gt;</span>
            </div>
          </div>
          {/* here goes the tag line */}
          <span>
            Your Trusted Password Vault
          </span>
        </div>

        {/* Here Goes the input tags */}

        <div className="flex flex-col justify-center">
          {/* Website name */}
          <input type="text" placeholder="Enter Website Name" className="px-6 text-lg w-2/4 mx-auto rounded-full h-10 max-xs:w-[90%]" ref={webnameRef}/>
          <div className="flex gap-6 mx-auto w-2/4 mt-6 max-xs:flex-col max-xs:w-full max-xs:items-center">
            {/* username inputtag */}
            <input type="text" placeholder="Enter username" className="h-10 text-lg rounded-full px-4 w-1/2 max-xs:w-[90%]" ref={usernameRef} />
            {/* password input tag */}
            <div className="w-1/2 bg-white rounded-full flex justify-between items-center pr-4 max-xs:w-[90%]">
            <input type={inptype} placeholder="Enter Password" className="h-10 text-lg px-4 rounded-full w-[90%]" ref={passRef}/>
            {/* here goes the hide show img */}
              <Image src={img} alt="revel" width={28} height={28} className="w-4 h-4 cursor-pointer" onClick={() => {toggleBtn()}}/>
            </div>
          </div>
          <button className="mt-6 bg-orange-500 px-6 py-1 rounded-full mx-auto flex justify-center items-center gap-2 mb-6" onClick={() => {handleSave()}}>
            Save
            <span>
              <Image src="/assets/save.png" height={28} width={28} alt="save" className="w-[1rem]"/>
            </span>
          </button>
        </div>

        {/* Here gos the credential details */}

        <div className="w-[80%] mx-auto max-xs:w-[95%]">
          {/* Heading */}
          <span className="font-bold text-xl">
            Your Passwords
          </span>

          {/* Here Goes the Credentials */}

          <div className="w-full mt-3">
            {/* Here Goes the headings */}
            <div className="font-semibold text-md text-white bg-green-600 rounded-t-xl py-1 px-2 grid grid-cols-[.2fr_2fr_1fr_.8fr_.6fr] gap-4 max-xs:gap-1 max-xs:text-sm max-xs:grid-cols-[1.5fr_1fr_1fr_.6fr]">

              <span className="flex justify-center items-center max-xs:hidden">
                s.no
              </span>

              <span className="flex justify-start pl-3 items-center max-xs:justify-start max-xs:px-4">
                Site
              </span>

              <span className="flex justify-start pl-1 items-center max-xs:pr-6">
                Username
              </span>

              <span className="flex justify-start pl-3 items-center max-xs:pr-3">
                Password
              </span>

              <span className="flex justify-center items-center">
                Actions
              </span>
            </div>
            {/* Here Goes the Credentials Passwords */}
            <div className="bg-green-200 border border-green-200 mb-20 rounded-b-lg">
              {items.map((item , index) => {
                return <Passdesign url={item.website} username={item.user} passkey={item.pass} key={index} slno = {index+1}/>;
              })}      
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
