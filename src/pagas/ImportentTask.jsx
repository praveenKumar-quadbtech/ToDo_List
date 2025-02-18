import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskCard } from '../components/TaskCard'
import { getTasks } from '../redux/slices/todoSlice'
import TaskList from '../components/TaskList'
import {  AiOutlineInbox } from "react-icons/ai";

export const ImportentTask = () => {
    const { tasks: items, loading, error } = useSelector(state => state.todos)
    const { isGrid } = useSelector(state => state.themeAndLayout)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getTasks())
    }, [])

    const inportentTask = items?.filter(task => task?.priority === "high")
       

    return (
        <div className="md:mt-7">
            <TaskList
                isGrid={isGrid}
                title="Here is the your Important tasks"
                tasks={inportentTask}
                emptyMessage="No Important Tasks"
                icon={AiOutlineInbox}
            />
        </div>
    )
}
