"use client"
import { React, useState } from 'react'
import Image from 'next/image'
import { ToastContainer , toast } from "react-toastify";
import { useForm } from 'react-hook-form';

const page = () => {
     const [rating, setRating] = useState(3);
     const { register, handleSubmit, formState: { errors }, reset } = useForm();
     const onSubmit = (data) =>{
       console.log(data);
       reset();
       toast.success("Thank you for submitting your feedback!");
     };

  return (
    <div className="mt-[3.8rem] h-[88.5vh]">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored"/>
            {/* feedback button */}
    
            {/* Feedback Form */}
            <div className={`h-full bg-[#F8FAFC] flex flex-col items-center overflow-y-auto z-20 dark:bg-slate-800`}>
    
                <div className='font-bold text-xl my-3 dark:text-white'>
                  Feedback Form
                </div>
    
                <form onSubmit={handleSubmit(onSubmit)} className='w-[100%] overflow-y-hidden'>
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
                              <Image src={star <= rating ? "/assets/fill-star.png" : "/assets/empty-star.png"} alt="star" height={34} width={34} />
                            </button>
                          ))}
                        </div>
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

export default page
