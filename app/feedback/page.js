"use client"
import React from 'react'
const page = () => {
    const handleSubmit = () => {
          toast.success("Submitted Successfully");
        }
  return (
    <div className='dark:bg-slate-800 h-[100vh]'>

      <div className={`h-full w-full bg-white flex flex-col items-center overflow-y-auto z-20 px-2 dark:bg-slate-800`}>

        <div className='mt-10 mb-5 text-2xl font-semibold'>
            Feedback Form
        </div>
      
                  <form action="" className='w-full h-full pl-3 mt-4 px-1 text-gray-600 dark:bg-slate-800 dark:text-white'>
                      {/* Rating */}
                      <div className=' flex flex-col gap-5'>
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
                              <div className='flex justify-between items-center w-[80%] mx-auto text-[.7rem]'>
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
                      <div className='flex flex-col gap-5 mt-4'>
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
      
                      <div className='flex flex-col gap-5 mt-4'>
                          <div className='text-sm'>
                              *If you encountered any bugs, please provide details. If not, we would appreciate any suggestions on how we can improve.
                          </div>
      
                          <textarea name="issue" id="issue" rows="3" className='rounded-sm px-1 bg-gray-200 dark:bg-gray-600'></textarea>
                      </div>
                      
                      <button className='mt-4 bg-blue-500 text-white w-full rounded-full h-[2.4rem] text-lg font-semibold mb-[2rem]' onClick={() => {handleSubmit()}}>Submit</button>
                  </form>
              </div>
    </div>
  )
}

export default page
