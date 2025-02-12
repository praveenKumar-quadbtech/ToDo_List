import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'

export const AddStaps = ({ step, hendelStepsChange, removeStep }) => {
    return (
        <span className='flex items-center gap-3'>
            <input type="checkbox" name="" id="" />
           
            <input
                className='px-3 dark:bg-[#2c2c2c] dark:text-white py-1 border-y-[0.5px]  border-green-100 outline-none'
                type="text"
                value={step}
                onChange={(e) => hendelStepsChange(e.target.value)}
            />
            <IoCloseSharp onClick={removeStep} className='cursor-pointer size-6' />
        </span>
    )
}
