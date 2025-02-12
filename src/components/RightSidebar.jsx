import { IoCloseSharp, IoRepeatOutline } from 'react-icons/io5'
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { onClose, setFormData } from '../redux/slices/sideBarSlice';
import { IoMdAdd } from 'react-icons/io';
import { FaRegBell, FaRegStar, FaStar } from 'react-icons/fa';
import { CiCalendar } from 'react-icons/ci';
import { deleteTodo, updateTodo } from '../redux/actions/task';
import DueDatePicker from '../utils/DatePeaker';
import { useState } from 'react';
import { AddStaps } from '../utils/AddStaps';
import { deleteTask } from '../redux/slices/todoSlice';

export const RightSidebar = () => {
    const [stepsCount, setStepsCount] = useState(0)
    const [step, setStep] = useState("")
    const { formData} = useSelector(state => state.sidebar)
    

    const dispatch = useDispatch()

    const stepsArray = Array(stepsCount).fill(step);

    const handleDelete = () => {
        dispatch(deleteTask({ id: data._id }));
        dispatch(onClose());
    };

    const hendelStepsChange = (value) => {
        setStep(value)
    }

    const removeStep = () => {
        setStepsCount(stepsCount - 1)
    }

    const handleStatus = () => {
        const newProgress = data?.progress === "pending" ? "completed" : "pending";

        dispatch(
            updateTodo({
                token,
                id: data._id,
                data: { ...data, progress: newProgress },
            })
        );
    };

    const handlePriorityChange = () => {
        const newPriority = data.priority === "low" || data.priority === "medium" ? "high" : "low";

        dispatch(
            updateTodo({
                token,
                id: data._id,
                data: { ...data, priority: newPriority },
            })
        );
    };

    return (
        <div className={`bg-green-50 h-full dark:bg-[#232323] dark:text-white transition-all duration-300 ease-in-out flex flex-col justify-between overflow-y-auto p-2`} >
            <div className='flex flex-col gap-3'>

                {/* <h3 className="text-md font-bold text-gray-800"></h3> */}
                <input 
                className='px-3 dark:bg-[#2c2c2c] dark:text-white py-1 border-y-[0.5px]  border-green-100 outline-none' 
                type="text" 
                value={formData.title}
                onChange={(e)=>{dispatch(setFormData({...formData, title : e.target.value}))}} 
                />

                {stepsArray.map(ele => (<AddStaps removeStep= {removeStep} step={step} hendelStepsChange={hendelStepsChange} />))}

                <button onClick={() => setStepsCount(stepsCount + 1)} className='flex gap-2 items-center px-2 py-2 border-b-[0.5px] border-green-100'><IoMdAdd /> Add Step</button>
                <button className='flex gap-2 items-center px-2 py-2 border-b-[0.5px] border-green-100'>
                    <FaRegBell className='size-4' />
                    Set Reminder
                </button>
                {/* <button className='flex flex-col gap-2 px-2 py-2 border-b-[0.5px] border-green-100'>
                    <span className='flex gap-2 items-center'>
                        <CiCalendar
                            className='size-4 font-bold'
                        // onClick={() => setTaskData({ ...taskData, deadline: "" })}
                        />
                        Add Due Date
                    </span>
                    <input type="date" />
                </button> */}
                <DueDatePicker />
                <button className='flex gap-2 items-center px-2 py-2 border-b-[0.5px] border-green-100'>
                    <IoRepeatOutline className='size-4 font-bold' />
                    Repeat
                </button>
                <textarea
                    id="description"
                    // value={taskData.description}
                    // onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    className="w-full px-4 border rounded-md"
                    placeholder="Add Notes"
                    rows="2"
                ></textarea>
            </div>
            <div className='w-full flex justify-between px-2 py-3 items-center border-b-[0.5px] border-green-100'>
                <IoCloseSharp onClick={() => dispatch(onClose())} className='cursor-pointer size-6' />
                <p>Created Today</p>
                <MdDeleteForever
                    className='cursor-pointer size-6'
                    onClick={handleDelete}
                />
            </div>
        </div>
    )
}
