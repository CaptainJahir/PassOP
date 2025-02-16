"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { ToastContainer , toast } from "react-toastify";


const Feedback = () => {
    const [display, setdisplay] = useState('hidden');
    const [feedbackBtn, setfeedbackBtn] = useState('block');

    // handle feedback button 
    const handleFeedbackBtn = () => {
      setdisplay('block');
      setfeedbackBtn('hidden')
    }

    const handleClose = () => {
      setdisplay('hidden');
      setfeedbackBtn('block');
    }

    const handleSubmit = () => {
      toast.success("Submitted Successfully");
    }
    
    
    
  return (
    <div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover pauseOnFocusLoss draggable theme="colored"/>
        {/* feedback button */}
        <div className={`fixed right-[-2.2rem] top-[50%] w-[6rem] h-[1.5rem] rotate-[270deg] bg-gray-800 text-white font-medium rounded-t-md text-center cursor-pointer ${feedbackBtn}`} onClick={() => {handleFeedbackBtn()}}>
            Feedback
        </div>

        {/* Feedback Form */}
        <div className={`fixed right-0 top-[20%] h-[60vh] w-[26rem] rounded-l-xl bg-gray-100 flex flex-col items-center overflow-y-auto ${display}`}>

            {/* logo and close button container */}
            <div className='flex justify-center items-center w-full relative bg-slate-700 rounded-t-md'>
            {/* Logo */}
            <div className="font-bold flex items-center pb-2 cursor-pointer pt-[1rem]">
                <span className="text-green-500 text-[1.5rem]">&lt;</span>
                <span className="text-[1.5rem] text-white">
                    Pass
                    <span className="text-[1.5rem] text-green-500">OP</span>
                </span>
                <span className="text-green-500 text-[1.5rem]">/&gt;</span>
            </div>
            {/* Close button */}
            <div className='cursor-pointer absolute right-1 invert mr-2' onClick={() => {handleClose()}}>
                <Image src="/assets/Delete.png" height={21} width={21} alt="close" />
            </div>
            </div>

            <form action="" className='w-full h-full pl-3 mt-4 px-1'>
                {/* Rating */}
                <div className='text-gray-600 flex flex-col gap-5'>
                    {/* Question */}
                    <div className='text-sm'>
                        *How likely are you to recommend this password manager to a friend or coworker (on a scale from 1 to 10)?
                    </div>

                    {/* Stars */}

                    <div>
                        {/* Input tags */}
                        <div className='flex justify-center items-center gap-10 w-[80%] mx-auto text-[.8rem]'>
                            {/* checkbox div */}
                            <div className='flex flex-col justify-center items-center font-semibold'>
                                <input type="radio" name="rating" id="one" />
                                <label htmlFor="one">1</label>
                            </div>

                            <div className='flex flex-col justify-center items-center font-semibold'>
                                <input type="radio" name="rating" id="two" />
                                <label htmlFor="two">2</label>
                            </div>

                            <div className='flex flex-col justify-center items-center font-semibold'>
                                <input type="radio" name="rating" id="three" />
                                <label htmlFor="three">3</label>
                            </div>

                            <div className='flex flex-col justify-center items-center font-semibold'>
                                <input type="radio" name="rating" id="four" />
                                <label htmlFor="four">4</label>
                            </div>

                            <div className='flex flex-col justify-center items-center font-semibold'>
                                <input type="radio" name="rating" id="five" />
                                <label htmlFor="five">5</label>
                            </div>
                        </div>
                        {/* good and bad text */}
                        <div className='flex justify-between items-center px-[2.5rem] w-[80%] mx-auto text-[.7rem]'>
                            <span>
                                Worst
                            </span>

                            <span>
                                Nice
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Bugs */}
                <div className='text-gray-600 flex flex-col gap-5 mt-4'>
                    {/* Question */}
                    <div className='text-sm'>
                        *Did you encounter any bugs?
                    </div>

                    {/* Radio tags */}

                    <div className='flex mx-auto justify-between items-center gap-3 w-[25%]'>
                        <div className='flex flex-col justify-center items-center'>
                            <input type="radio" name="bugs" id="yes" />
                            <label htmlFor="yes">Yes</label>
                        </div>

                        <div className='flex flex-col justify-center items-center'>
                            <input type="radio" name="bugs" id="no" />
                            <label htmlFor="no">No</label>
                        </div>
                    </div>
                </div>

                {/* Details */}

                <div className='text-gray-600 flex flex-col gap-5 mt-4'>
                    <div className='text-sm'>
                        *If you encountered any bugs, please provide details. If not, we would appreciate any suggestions on how we can improve.
                    </div>

                    <textarea name="issue" id="issue" rows="3" className='rounded-sm px-1'></textarea>
                </div>
                
                <button className='mt-4 bg-blue-500 text-white w-full rounded-full h-[2.4rem] text-lg font-semibold mb-[2rem]' onClick={() => {handleSubmit()}}>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Feedback
