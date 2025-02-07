"use client"
import Image from "next/image";
import Passdesign from "@/components/passDesign";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { additem } from '@/redux/slice/ArraySlice'

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

    }
    else{
      alert("The input fieds must not be empty")
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
    <div className="bg-green-100 w-[100vw] h-[100vh]">
      {/* Navbar Goes Here */}
      <div className="bg-slate-700 w-full h-[8%] flex items-center justify-between px-10">
        {/* Logo */}
        <div className="font-bold text-white flex items-center cursor-pointer">
          <span className="text-green-500 text-2xl">&lt;</span>
          <span className="text-lg">
            Pass
            <span className="text-lg text-green-500">OP</span>
          </span>
          <span className="text-green-500 text-lg">/&gt;</span>
        </div>

        {/* Github Link */}
        <div className="flex items-center justify-around w-28 text-white font-semibold cursor-pointer rounded-full px-2 py-1 border border-transparent hover:border-white">
          <Image src="/assets/github.ico" width={28} height={28} alt="github link" />
          <span>GitHub</span>
        </div>
      </div>

      {/* Body Goes here */}

      <div>
        {/* here goes the logo and its tag line */}
        <div className="flex flex-col justify-center items-center my-6">
          {/* here goes the logo */}
          <div>
            <div className="font-bold text-black flex items-center cursor-pointer">
              <span className="text-green-600 text-5xl">&lt;</span>
              <span className="text-4xl">
                Pass
                <span className="text-4xl text-green-600">OP</span>
              </span>
              <span className="text-green-600 text-4xl">/&gt;</span>
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
          <input type="text" placeholder="Enter Website Name" className="px-6 text-lg w-2/4 mx-auto rounded-full h-10" ref={webnameRef}/>
          <div className="flex gap-6 mx-auto w-2/4 mt-6">
            <input type="text" placeholder="Enter username" className="h-10 text-lg rounded-full px-4 w-1/2" ref={usernameRef} />
            {/* password input tag */}
            <div className="w-1/2 bg-white rounded-full flex justify-between items-center pr-4">
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

        <div className="w-[80%] mx-auto">
          {/* Heading */}
          <span className="font-bold text-xl">
            Your Passwords
          </span>

          {/* Here Goes the Credits */}

          <div className="w-full mt-3">
            {/* Here Goes the headings */}
            <div className="bg-green-600 rounded-t-xl py-1 px-2 grid grid-cols-[40px_3fr_1fr_1fr_.6fr] gap-4">

              <span className="flex justify-center items-center font-semibold text-md text-white">
                s.no
              </span>

              <span className="flex justify-center items-center font-semibold text-md text-white">
                Site
              </span>

              <span className="flex justify-center items-center font-semibold text-md text-white">
                Username
              </span>

              <span className="flex justify-center items-center font-semibold text-md text-white">
                Password
              </span>

              <span className="flex justify-center items-center font-semibold text-md text-white">
                Actions
              </span>
            </div>
            {/* Here Goes the Credentials Passwords */}
            <div className="bg-green-200 border border-green-200">
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
