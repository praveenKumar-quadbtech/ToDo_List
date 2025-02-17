import React from 'react'
import { formatDateTime } from '../utils/scripts';

export const ShowReminders = ({reminders}) => {
  return (
    <div className='flex flex-col gap-2'>
          <h3>Reminders</h3>
          {reminders?.map((reminder,idx)=>{
            return <p 
            key={idx}
            className='text-sm'
            >{idx+1}. {" "} {formatDateTime(reminder)}</p>
          })}
    </div>
  )
}
