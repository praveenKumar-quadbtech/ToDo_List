import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskCard } from '../components/TaskCard'
import { getTasks } from '../redux/slices/todoSlice'

export const ImportentTask = () => {
    const { tasks: items, loading, error } = useSelector(state => state.todos)
    const { isGrid } = useSelector(state => state.themeAndLayout)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getTasks())
    }, [])
    return (
        <div className={`${isGrid ? "" : "w-full max-w-3xl m-auto"}`}>
            <div className={`p-5 flex flex-col gap-2 m-5 dark:text-white`} >
                <h3 className='pb-3'>Here is the your Important tasks</h3>
                {items?.length === 0 ?
                    <div>
                        <h3 className="p-4">No task found</h3>
                    </div>
                    :
                    <div className={`gap-2 ${isGrid ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3" : "flex flex-col"}`}>
                        {items?.map((task, idx) => {
                            if (task.priority === "high") {
                                return <TaskCard key={idx} task={task} />
                            }
                        })}
                    </div>
                }
            </div>
        </div>
    )
}
