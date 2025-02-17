import React, { useEffect, useRef, useState } from 'react';
import { CiCalendar } from 'react-icons/ci';
import { FaRegBell } from 'react-icons/fa';
import { IoRepeatOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/slices/todoSlice';
import { RightSidebar } from "../components/RightSidebar"

export const AddTask = ({ addNew, toggleTaskForm, toggleRightForm, isRightForm }) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null)
    const [error, setError] = useState("");

    const initialFormState = {
        title: "",
        priority: "low",
        deadline: "",
        steps: [],
        reminders: [],
        repeat: "",
        description: "",
    };
    const [formData, setFormData] = useState(initialFormState)
   
    const handelChange = (e) => {
        const { name, value } = e.target
        console.log(name, value);

       
        if (name === "steps") {
            setFormData((prev) => ({
                ...prev,
                steps: [...prev.steps, value]
            }));
            return
        }
        if (name === "reminders") {
            const formateDate = new Date(value)
            console.log("from handelChange", formateDate.toLocaleString());
            
            setFormData((prev) => ({
                ...prev,
                reminders: [...prev.reminders, value],
            }));
        }


        else{
            setFormData({ ...formData, [name]: value })
        }

        
    }

    const handleAdd = () => {
        if (formData.title !== "") {
            setError("");
            dispatch(addTask(formData));
            toggleTaskForm(false)
            toggleRightForm(false)
            setFormData(initialFormState)
        }
        else {
            setError("title is require");
        }
    };

    useEffect(() => {
        inputRef.current.focus()
    }, [addNew])

    return (<>
        <div className={`${!addNew ? "flex" : "hidden"} bg-green-50 dark:bg-[#2F3630] flex justify-end px-5 py-2 rounded-sm`} >
            <button className="bg-[#357937E0] rounded-md px-3 py-1 font-bold text-white" onClick={() => toggleTaskForm(true)}>Add New</button>
        </div>

        <div className={`${addNew ? "flex" : "hidden"} rounded-sm w-full dark:bg-[#2F3630] py-1 dark:text-white flex-col gap-2 px-5 text-gray-900 bg-green-50`}>
            {/* Task Title */}
            <form >
                <div className='flex flex-col max-w-md'>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Title</label>
                    <input
                        ref={inputRef}
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handelChange}
                        className="dark:bg-[#242424] dark:text-white border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none block w-full p-2.5 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter task title"
                        required
                    />
                </div>

                {/* Right Sidebar */}
                {isRightForm ? (
                    <div className="absolute border-[0.5px] rounded-sm right-0 top-16 md:top-0 md:w-[30%] transition-all duration-300  md:transform md:translate-x-0 opacity-100">
                        <RightSidebar toggleRightForm={toggleRightForm} handelChange={handelChange} formData={formData}/>
                    </div>
                ) : (
                    <div className="absolute right-0 top-16 md:top-0 w-[29%] 
                  transition-all duration-300  transform translate-x-full opacity-0">
                    </div>
                )}


            </form>
            {/* Error message */}
            {error && <p className='text-red-700 pt-1 pb-2'>{error}</p>}

            {/* Action Buttons */}
            <div className='w-full flex justify-between px-6 items-center pb-5'>
                <div className='flex items-center gap-3'>
                    <FaRegBell onClick={() => toggleRightForm(true)} className='size-5 hover:scale-125 active:scale-110 cursor-pointer' />
                    <IoRepeatOutline onClick={() => toggleRightForm(true)} className='size-6 hover:scale-125 active:scale-125 cursor-pointer' />
                    <CiCalendar
                        className='size-6 hover:scale-125 cursor-pointer active:scale-125'
                        // onClick={() => setTaskData({ ...taskData, deadline: "" })}
                        onClick={() => toggleRightForm(true)}
                    />
                </div>

                <button className="bg-[#357937E0] rounded-md px-3 py-1 font-bold text-white" onClick={handleAdd}>ADD TASK</button>
            </div>
        </div>
    </>);
};
