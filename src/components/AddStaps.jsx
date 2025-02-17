import React, { useEffect, useRef, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'

export const AddStaps = ({ removeStep, handleStepKeyDown}) => {
    const inputRef = useRef(null)

    useEffect(()=>{
        inputRef.current.focus()
    },[])
    return (
        <span className='flex items-center gap-3'>
            <input
                className='focus:border-[0.5px] w-[80%] rounded-md dark:bg-[#2c2c2c] dark:text-white px-3 py-1  border-black dark:border-green-100 outline-none'
                type="text"
                name='step'
                onKeyDown={handleStepKeyDown}
                ref={inputRef}
            />
            <IoCloseSharp onClick={removeStep} className='cursor-pointer size-5' />
        </span>
    )
}
