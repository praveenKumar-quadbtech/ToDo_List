import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskCard } from '../components/TaskCard'
import { fetchTodos } from '../redux/actions/task'

export const ImportentTask = () => {
    const { items, loading, error } = useSelector(state => state.todos)
const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)


useEffect(()=>{
    dispatch(fetchTodos(token))
  },[])
  return (
      <div className='p-5 flex flex-col gap-2'>
           <h3 className='pb-3'>Here is the your Important tasks</h3>
               {items?.length === 0  ?
             <div>
               <h3 className="p-4">No task found</h3>
             </div> 
             :
                 items?.map((task,idx)=>{
                     if (task.priority === "high"){
                         return <TaskCard key={idx} task={task} />
                     }
                 }) 
           
             }
             </div>
  )
}
