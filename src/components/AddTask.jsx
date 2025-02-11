import React, { useEffect, useState } from 'react';
import { CiCalendar } from 'react-icons/ci';
import { FaRegBell } from 'react-icons/fa';
import { IoRepeatOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from './../utils/LodingButton';
import { addTask } from '../redux/slices/todoSlice';
import { onOpen } from '../redux/slices/sideBarSlice';

export const AddTask = () => {
    const dispatch = useDispatch();
    const { isLogged } = useSelector(state => state.auth);
    const [addNew, setAddNew] = useState(false)
    const [taskData, setTaskData] = useState({
        title: "",
        deadline: "",
    });

    const [error, setError] = useState("");

    // Clear form on successful task addition
    // useEffect(() => {
    //     if (success) {
    //         setTaskData({
    //             title: "",
    //             description: "",
    //             deadline: "",
    //             progress: "Pending"
    //         })
    //         setAddNew(false)
    //     }
    // }, [success]);

    const handleAdd = () => {
        if (taskData.title !== ""){
            setError("");
            dispatch(addTask(taskData));
            setTaskData({
                title: "",
                deadline: "",
            })
            setAddNew(false)
        }
          else{
            setError("title is require");
          } 
    };


    return (<>
        <div className={`${!addNew ? "flex" : "hidden"} bg-green-50 dark:bg-[#2F3630] flex justify-end px-5 py-2`} >
            <button className="bg-[#357937E0] rounded-md px-3 py-1 font-bold text-white" onClick={() => setAddNew(!addNew)}>Add New</button>
        </div>

        <div className={`${addNew ? "flex" : "hidden"}  w-full dark:bg-[#2F3630] dark:text-white flex-col justify-center items-center gap-2 px-5 text-gray-900 bg-green-100`}>
            <h3 className="text-xl font-semibold">Add To Do</h3>
            {/* Task Title */}
            <div className='flex flex-col w-full md:w-1/2 m-auto cursor-pointer'>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Title</label>
                <input
                    id="title"
                    type="text"
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                    className="bg-gray-50 cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter task title"
                    required
                />
            </div>

            {/* Error message */}
            {error && <p className='text-red-700 pt-1 pb-2'>{error}</p>}

            {/* Action Buttons */}
            <div className='w-full md:w-1/2 flex justify-between px-6 items-center pb-5'>
                <div className='flex items-center gap-3'>
                    <FaRegBell onClick={()=>dispatch(onOpen(taskData))} className='size-5 hover:scale-125 active:scale-110 cursor-pointer' />
                    <IoRepeatOutline onClick={() => dispatch(onOpen(taskData))} className='size-6 hover:scale-125 active:scale-125 cursor-pointer' />
                    <CiCalendar
                        className='size-6 hover:scale-125 cursor-pointer active:scale-125'
                        // onClick={() => setTaskData({ ...taskData, deadline: "" })}
                        onClick={() => dispatch(onOpen(taskData))}
                    />
                </div>
                {/* <LoadingButton
                    type="button"
                    chickHandler={handleAdd}
                    // loading={isAdding}
                    className='bg-white rounded-md px-2 py-1'
                >
                    ADD TASK
                </LoadingButton> */}

                <button className="bg-[#357937E0] rounded-md px-3 py-1 font-bold text-white" onClick={handleAdd}>ADD TASK</button>
            </div>
        </div>
    </>);
};
