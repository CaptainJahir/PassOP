"use client"
import Image from "next/image";
import Passdesign from "@/components/passDesign";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { additem, getItem } from '@/redux/slice/ArraySlice'
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function Home() {
  const [img, setimg] = useState("/assets/show.png");
  const [inptype, setinptype] = useState("password");
  const dispatch = useDispatch();
  const items = useSelector((state) => state.CredentialArray.items);
  const edititems = useSelector(state => state.Editarray.value);
  

  useEffect(() => {
    let retriveItems;
    try {
      retriveItems = JSON.parse(localStorage.getItem("creds"));
    } catch (e) {
      retriveItems = [];
    }
    dispatch(getItem(retriveItems));
  }, [])
  
  const { register, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm();
  const onSubmit = (data) => {
      dispatch(additem(data));
      toast.success("Saved Sucessfully");
      reset();
  }
  const inpValidation = () => {
    if (getValues("web") === "" || getValues("user") ==="" || getValues("pass") ==="" ) {
      toast.info("Input fields must not be empty");
    }else if (getValues("user").length <4 ) {
      toast.info("The username must be at least 4 characters long.")
    }else if (getValues("pass").length <4) {
      toast.info("The password must be at least 4 characters long.")
    }
  }
  

  const editFunction = () => {
    if (edititems.length !== 0) {
    setValue("web", edititems[0].web);
    setValue("user", edititems[0].user);
    setValue("pass", edititems[0].pass);
    }
  }

  useEffect(() => {
    editFunction();
  }, [edititems])
  

  // Form Handling
  useEffect(() => {
    localStorage.setItem("creds", JSON.stringify(items));
  }, [items])



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
    <div className="bg-green-100 w-[100vw] overflow-x-hidden dark:bg-[rgb(21,21,21)]">
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

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored"/>

      {/* Body Goes here */}

      <div className="mt-[6rem]">
        {/* here goes the logo and its tag line */}
        <div className="flex flex-col justify-center items-center my-6">
          {/* here goes the logo */}
          <div>
            <div className="font-bold text-black flex items-center cursor-pointer">
              <span className="text-green-600 text-5xl max-md:text-2xl dark:text-red-500">&lt;</span>
              <span className="text-4xl max-md:text-2xl dark:text-white">
                Pass
                <span className="text-4xl text-green-600 max-md:text-2xl dark:text-red-500">OP</span>
              </span>
              <span className="text-green-600 text-4xl max-md:text-2xl dark:text-red-500">/&gt;</span>
            </div>
          </div>
          {/* here goes the tag line */}
          <span className="dark:text-white">
            Your Trusted Password Vault
          </span>
        </div>

        {/* Here Goes the Input Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center">
              {/* Website name */}
              <input {...register("web", {required:true})} name="web" placeholder="Enter Website Name" className="px-6 text-lg w-2/4 mx-auto rounded-full h-10 max-md:w-[90%]" />
              <div className="flex gap-6 mx-auto w-2/4 mt-6 max-md:flex-col max-md:w-full max-md:items-center">
                {/* username input tag */}
                <input {...register("user", {required:true, minLength:4})} name="user" placeholder="Enter username" className="h-10 text-lg rounded-full px-4 w-1/2 max-md:w-[90%]" />
                {/* password input tag */}
                <div className="w-1/2 bg-white rounded-full flex justify-between items-center pr-4 max-md:w-[90%]">
                <input type={inptype} {...register("pass", {required:true, minLength:4})} name="pass" placeholder="Enter Password" className="h-10 text-lg px-4 rounded-full w-[90%]" />
                {/* here goes the hide show img */}
                  <Image src={img} alt="revel" width={28} height={28} className="w-4 h-4 cursor-pointer" onClick={() => {toggleBtn()}}/>
                </div>
              </div>
          </div>
          {/* Submit button */}
          <button type="submit" onClick={() => {inpValidation()}} className="mt-6 w-[8rem] bg-orange-500 px-6 py-1 rounded-full mx-auto flex justify-center items-center gap-2 mb-6 dark:text-white dark:bg-amber-900">
            <span>Submit</span>
            <span>
              <Image src="/assets/save.png" height={28} width={28} alt="save" className="w-[1rem] dark:invert"/>
            </span>
          </button>
        </form>

        {/* Here gos the credential details */}

        <div className="w-[80%] mx-auto max-md:w-[95%]">
          {/* Heading */}
          <span className="font-bold text-xl dark:text-white">
            Your Passwords
          </span>

          {/* Here Goes the Credentials */}

          <div className="w-full mt-3">
            {/* Here Goes the headings */}
            <div className="font-semibold text-md text-white bg-green-600 rounded-t-xl py-1 px-2 grid grid-cols-[.2fr_2fr_1fr_.8fr_.6fr] gap-4 dark:bg-[rgb(70,0,0)] max-md:gap-1 max-md:text-sm max-md:grid-cols-[1fr_1fr_1fr_.6fr]">

              <span className="flex justify-center items-center max-md:hidden">
                s.no
              </span>

              <span className="flex justify-start pl-3 items-center max-md:justify-start max-md:px-[0.1rem]">
                Site
              </span>

              <span className="flex justify-start pl-1 items-center">
                Username
              </span>

              <span className="flex justify-start pl-3 items-center max-md:pl-0">
                Password
              </span>

              <span className="flex justify-center items-center">
                Actions
              </span>
            </div>
            {/* Here Goes the Credentials Passwords */}
            <div className="bg-green-200 border border-green-200 mb-20 rounded-b-lg dark:text-white dark:bg-black dark:border-black">
              {items.map((item , index) => {
                return <Passdesign url={item.web} username={item.user} passkey={item.pass} key={index} slno = {index+1}/>;
              })}      
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
