import React, { useEffect } from 'react'
import { AiOutlineInbox } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks } from '../redux/slices/todoSlice'
import { TaskCard } from '../components/TaskCard'

export const PendingTask = () => {
    const { tasks: items, loading, error } = useSelector(state => state.todos)
    const { isGrid } = useSelector(state => state.themeAndLayout)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasks())
    }, [])




    return (
        <div className={`${isGrid ? "" : "w-full max-w-3xl m-auto"}`}>
        <div className={`p-5 flex flex-col gap-2 m-5 dark:text-white`} >
            <h3 className='pb-3'>Here is the your all in-completed tasks</h3>
            {items?.length === 0 ?
                <div className={`bg-white flex flex-col justify-center items-center shadow-md rounded-lg p-6 mb-4 border text-gray-500`}>
                    <AiOutlineInbox size={40} className="text-gray-400 mb-2" />
                    <h3 className="text-lg font-semibold">No Pending Tasks</h3>
                    <p className="text-sm text-gray-400">Start by adding a new task!</p>
                </div>
                :
                    <div className={`gap-2 ${isGrid ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3" : "flex flex-col"}`}>
                    {items?.map((task, idx) => {
                        if (task.progress === "pending") {
                            return <TaskCard key={idx} task={task} />
                        }
                    })}
                </div>
            }
        </div>
        </div>
    )
}
