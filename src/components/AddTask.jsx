import React, { useEffect, useRef, useState } from 'react';
import { CiCalendar } from 'react-icons/ci';
import { FaRegBell } from 'react-icons/fa';
import { IoRepeatOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/slices/todoSlice';
import { clearFormData, onAdd, onClose, setFormData} from '../redux/slices/sideBarSlice';

export const AddTask = ({ addNew, toggleTaskForm }) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null)
    const {formData} = useSelector(state=>state.sidebar)
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
        if (formData.title !== ""){
            setError("");
            dispatch(addTask(formData));
            toggleTaskForm(false)
            dispatch(clearFormData())
        }
          else{
            setError("title is require");
          } 
    };

useEffect(()=>{
    inputRef.current.focus()
}, [addNew])   

    return (<>
        <div className={`${!addNew ? "flex" : "hidden"} bg-green-50 dark:bg-[#2F3630] flex justify-end px-5 py-2 rounded-sm`} >
            <button className="bg-[#357937E0] rounded-md px-3 py-1 font-bold text-white" onClick={() => toggleTaskForm(true)}>Add New</button>
        </div>

        <div className={`${addNew ? "flex" : "hidden"} rounded-sm w-full dark:bg-[#2F3630] py-1 dark:text-white flex-col gap-2 px-5 text-gray-900 bg-green-50`}>
            {/* Task Title */}
            <div className='flex flex-col max-w-md'>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Title</label>
                <input
                ref={inputRef}
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => dispatch(setFormData({ ...formData, title: e.target.value }))}
                    className="dark:bg-[#242424] dark:text-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    placeholder="Enter task title"
                    required
                />
            </div>

            {/* Error message */}
            {error && <p className='text-red-700 pt-1 pb-2'>{error}</p>}

            {/* Action Buttons */}
            <div className='w-full flex justify-between px-6 items-center pb-5'>
                <div className='flex items-center gap-3'>
                    <FaRegBell onClick={()=>dispatch(onAdd())} className='size-5 hover:scale-125 active:scale-110 cursor-pointer' />
                    <IoRepeatOutline onClick={() => dispatch(onAdd())} className='size-6 hover:scale-125 active:scale-125 cursor-pointer' />
                    <CiCalendar
                        className='size-6 hover:scale-125 cursor-pointer active:scale-125'
                        // onClick={() => setTaskData({ ...taskData, deadline: "" })}
                        onClick={() => dispatch(onAdd())}
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
