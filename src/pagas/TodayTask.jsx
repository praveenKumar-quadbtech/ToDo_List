import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskCard } from '../components/TaskCard'
import { fetchTodos } from '../redux/actions/task'

export const TodayTask = () => {
    const { items, loading, error } = useSelector(state => state.todos)
    const { token } = useSelector(state => state.auth)

    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(fetchTodos(token))
    }, [])
    return (
        <div className='p-5 flex flex-col gap-2 m-5'>
            <h3 className='pb-3'>Here is the your pending tasks</h3>
            {items?.length === 0 ?
                <div>
                    <h3 className="p-4">No task found</h3>
                </div>
                :
                items?.map((task, idx) => {
                    const createdAtDate = new Date(task?.createdAt);
                    const currentDate = new Date();
                    if (task.progress === "pending") {
                        return <TaskCard key={idx} task={task} />
                    }
                })


            }
        </div>
    )
}
