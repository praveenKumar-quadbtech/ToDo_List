import React, { useEffect, useState } from 'react';
import { CiCalendar } from 'react-icons/ci';
import { FaRegBell } from 'react-icons/fa';
import { IoRepeatOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/actions/task';
import LoadingButton from './../utils/LodingButton';

export const AddTask = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);
    const { isAdding, success } = useSelector(state => state.todos);
    const [addNew, setAddNew] = useState(false)
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        deadline: "",
    });

    const [error, setError] = useState("");

    // Clear form on successful task addition
    useEffect(() => {
        if (success) {
            setTaskData({
                title: "",
                description: "",
                deadline: "",
            })
            setAddNew(false)
        }
    }, [success]);

    const handleAdd = () => {
        const { title, deadline } = taskData;
        if (!title || !deadline) {
            setError("Title and deadline are required.");
        } else {
            setError("");
            dispatch(addTodo({ token, todo: taskData }));
        }
    };


    return (<>
        <div className={`${!addNew ? "flex" : "hidden"} bg-green-50 flex justify-end px-5 py-2`} >
            <button className="bg-black rounded-md px-3 py-1 font-bold text-white" onClick={() => setAddNew(!addNew)}>Add New</button>
        </div>

        <div className={`${addNew ? "flex" : "hidden"}  w-full  flex-col justify-center items-center gap-2 px-5 text-gray-900 bg-green-100`}>
            <h3 className="text-xl font-semibold">Add To Do</h3>
            {/* Task Title */}
            <div className='flex flex-col w-full md:w-1/2 m-auto cursor-pointer'>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Task Title</label>
                <input
                    className="cursor-pointer"
                    id="title"
                    type="text"
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter task title"
                    required
                />
            </div>

            {/* Task Description */}
            <div className="mb-4 w-full md:w-1/2">
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                <textarea
                    id="description"
                    value={taskData.description}
                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    className="w-full px-4 border rounded-md"
                    placeholder="Enter task description"
                    rows="2"
                ></textarea>
            </div>

            {/* Deadline */}
            <div className="mb-3 w-full md:w-1/2">
                <label htmlFor="deadline" className="block text-sm font-medium mb-1">Deadline</label>
                <input
                    id="deadline"
                    type="date"
                    value={taskData.deadline}
                    onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md"
                    min={new Date().toISOString().split("T")[0]}
                    required
                />
            </div>

            {/* Error message */}
            {error && <p className='text-red-700 pt-1 pb-2'>{error}</p>}

            {/* Action Buttons */}
            <div className='w-full md:w-1/2 flex justify-between px-6 items-center pb-5'>
                <div className='flex items-center gap-3'>
                    <FaRegBell className='size-5 hover:scale-125 active:scale-110 cursor-pointer' />
                    <IoRepeatOutline className='size-6 hover:scale-125 active:scale-125 cursor-pointer' />
                    <CiCalendar
                        className='size-6 hover:scale-125 cursor-pointer active:scale-125'
                        onClick={() => setTaskData({ ...taskData, deadline: "" })}
                    />
                </div>
                <LoadingButton
                    type="button"
                    chickHandler={handleAdd}
                    loading={isAdding}
                    className='bg-white rounded-md px-2 py-1'
                >
                    ADD TASK
                </LoadingButton>
            </div>
        </div>
    </>);
};
