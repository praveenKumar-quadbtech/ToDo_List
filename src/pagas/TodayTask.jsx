import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskCard } from '../components/TaskCard'
import { getTasks } from '../redux/slices/todoSlice'
import { AiOutlineInbox } from "react-icons/ai";
import TaskList from '../components/TaskList';

export const TodayTask = () => {
    const { tasks: items, loading, error } = useSelector(state => state.todos)
    const { isGrid } = useSelector(state => state.themeAndLayout)

    const dispatch = useDispatch()
    const currentDate = new Date().toISOString().split("T")[0]
   const todayTask =  items?.filter(task => {
        if(task?.deadline){
            const deadline = new Date(task?.deadline).toISOString().split("T")[0];
            if(deadline == currentDate){
                return task
            }
        }
    })

    useEffect(() => {
        dispatch(getTasks())
    }, [])


    return (
        <div className="md:mt-7">
            <TaskList
                isGrid={isGrid}
                title="Here is the your all today tasks"
                tasks={todayTask}
                emptyMessage="No Today Tasks"
                icon={AiOutlineInbox}
            />
        </div>
        )
}
