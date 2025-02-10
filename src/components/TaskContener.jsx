import React, { useEffect, useState } from 'react'
import { TaskCard } from './TaskCard'
import { useSelector } from 'react-redux'

export const TaskContener = () => {
    const { items } = useSelector(state => state.todos)
    console.log('Redux State:', items);
    const pendingTask = items?.filter((task) => task.progress === "pending")
    const completedTask = items?.filter((task) => task.progress === "completed")

    return (
        <div className='flex flex-col gap-5 w-full max-w-3xl'>
            <>
                <h3>Pending Task</h3>
                {pendingTask.length === 0 ?
                    <div className='bg-white flex justify-between items-center shadow-md rounded-lg p-5 mb-4 border'>
                        <h3>No Pending Task is Here</h3>
                    </div>
                    :
                    <div className="flex flex-col gap-3">
                        {pendingTask?.map((task, idx) => {
                            return <TaskCard key={idx} task={task} />
                        })}
                    </div>}
            </>

            <>
                <h3>Completed Task</h3>
                {completedTask.length === 0 ?
                    <div className='bg-white flex justify-between items-center shadow-md rounded-lg p-5 mb-4 border'>
                        <h3>No Task Completed Yet</h3>
                    </div>
                    :
                    <div className="flex flex-col gap-3">
                        {completedTask?.map((task, idx) => {
                            return <TaskCard key={idx} task={task} />
                        })}
                    </div>}
            </>
        </div>
    )
}
