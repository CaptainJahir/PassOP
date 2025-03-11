"use client"
import { React, useState } from 'react'
import Image from 'next/image'
import { ToastContainer , toast } from "react-toastify";
import { useForm } from 'react-hook-form';

const Feedback = () => {
    const [display, setdisplay] = useState('hidden');
    const [feedbackBtn, setfeedbackBtn] = useState('block');
    const [rating, setRating] = useState(3);

    // handle feedback button 
    const handleFeedbackBtn = () => {
      setdisplay('block');
      setfeedbackBtn('hidden')
    }

    const handleClose = () => {
      setdisplay('hidden');
      setfeedbackBtn('block');
    }
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = async (data) =>{
      const a = await fetch('http://localhost:3001/feedback', {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (a.status === 200) {
        reset();
        toast.success("Thank you for submitting your feedback!");
      }else{
        toast.error("Error encountered");
      }
    };
    
  return (
    <div className="max-md:hidden">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick draggable theme="colored"/>
        {/* feedback button */}
        <div className={`fixed right-[-2.2rem] top-[50%] w-[6rem] h-[1.5rem] rotate-[270deg] bg-gray-800 text-white font-medium rounded-t-md text-center cursor-pointer ${feedbackBtn}`} onClick={() => {handleFeedbackBtn()}}>
            Feedback
        </div>

        {/* Feedback Form */}
        <div className={`fixed right-0 top-[20%] h-[60vh] w-[26rem] rounded-l-xl bg-[#F8FAFC] flex flex-col items-center overflow-y-auto ${display} z-20 dark:bg-slate-800`}>

            {/* logo and close button container */}
            <div className='flex justify-center items-center w-full relative bg-[#2A4365] rounded-tl-md dark:bg-[rgb(70,0,0)]'>
            {/* Logo */}
            <div className="font-bold flex items-center pb-2 cursor-pointer pt-[1rem]">
                <span className="text-green-500 text-[1.5rem] dark:text-red-500">&lt;</span>
                <span className="text-[1.5rem] text-white">
                    Pass
                    <span className="text-[1.5rem] text-green-500 dark:text-red-500">OP</span>
                </span>
                <span className="text-green-500 text-[1.5rem] dark:text-red-500">/&gt;</span>
            </div>
            {/* Close button */}
            <div className='cursor-pointer absolute right-1 invert mr-2' onClick={() => {handleClose()}}>
                <Image src="/assets/Delete.png" height={21} width={21} alt="close" loading='eager'/>
            </div>
            </div>

            <div className='font-bold text-xl my-3 dark:text-white'>
              Feedback Form
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='w-[100%]'>
                {/* register your input into the hook by invoking the "register" function */}
                <div className='flex flex-col gap-1'>
                  {/* Email */}
                  <div className='flex flex-col justify-center items-start gap-1 w-[90%] mx-auto'>
                    <span className='font-semibold text-gray-600 dark:text-gray-200'>Email*</span>
                    <input {...register("email", {required: true})} className='bg-[#DBE4E78C] w-full h-[2.2rem] rounded-md px-3 dark:bg-gray-400 dark:text-white' type='email' />
                    {errors.email && <span className="text-red-600 font-medium text-sm mx-auto">This field is required</span>}
                  </div>
                  {/* rating */}
                  <div className='flex flex-col gap-1 w-[90%] justify-center items-start mx-auto mt-4'>
                    <span className='font-semibold text-gray-600 dark:text-gray-200'>
                      Rating*
                    </span>
                    {/* rating stars */}
                    <div className='flex justify-between items-center w-full px-4'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={(e) => {setRating(star), e.preventDefault()}} className="cursor-pointer" >
                          <Image src={star <= rating ? "/assets/fill-star.png" : "/assets/empty-star.png"} alt="star" height={34} width={34} loading='lazy' />
                        </button>
                      ))}
                    </div>
                      <input {...register("rating")} value={rating} className='hidden' />
                  </div>
                  
                  {/* Rating */}
                  <div className='flex flex-col gap-1 w-[90%] justify-center items-start mx-auto mt-4'>
                    <span className='font-semibold text-gray-600 dark:text-gray-200'>Review* </span>
                    <textarea {...register("review", { required: true })} rows={3} className='bg-[#DBE4E78C] w-full px-3 dark:bg-gray-400 rounded-md py-[0.2rem]'/>
                    {/* errors will return when field validation fails  */}
                    {errors.review && <span className="text-red-600 font-medium text-sm mx-auto">This field is required</span>}
                  </div>
                </div>
                
                <div className='flex justify-center items-center'>
                  <button type='submit' className='bg-[#3182CE] text-white w-[5rem] mt-[1rem] h-[2rem] rounded-lg hover:bg-[#2C7A7B] my-4'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Feedback
