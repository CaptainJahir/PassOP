"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/redux/slice/ArraySlice'

const page = () => {
  const items = useSelector((state) => state.credarray.items); 
      const dispatch = useDispatch()
    
      return (
        <div>
          <div>
            <button
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <span>{count}</span>
            <button
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
          </div>
        </div>
      )
}

export default page
