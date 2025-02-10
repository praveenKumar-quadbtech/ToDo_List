import { IoCloseSharp, IoRepeatOutline } from 'react-icons/io5'
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { onClose } from '../redux/slices/sideBarSlice';
import { IoMdAdd } from 'react-icons/io';
import { FaRegBell, FaRegStar, FaStar } from 'react-icons/fa';
import { CiCalendar } from 'react-icons/ci';
import { deleteTodo, updateTodo } from '../redux/actions/task';

export const RightSidebar = () => {
    const { isOpen, data } = useSelector(state => state.sidebar)
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteTodo({ token, id: data._id }));
        dispatch(onClose());
    };

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
        <div className={`bg-green-50 h-[calc(100vh-100px)] w-[300px] border-2 fixed right-0 transition-all duration-300 ease-in-out ${isOpen ? "right-0" : "right-[-300px]"} flex flex-col justify-between overflow-y-auto px-2`} >
            <div className='flex flex-col gap-3'>
                {/* Task card */}
                <div className="flex gap-2 items-center justify-between px-2 py-3 border-b-2">
                    <span className='flex gap-3 items-center'>
                    <input
                        type="checkbox"
                        checked={data.progress === "completed"}
                        onChange={handleStatus}
                        className="cursor-pointer"
                        aria-label="Toggle Task Status"
                    />
                    <h3 className="text-md font-bold text-gray-800">{data?.title}</h3>
                    </span>
                    {/* Change Priority Button */}
                    <button onClick={handlePriorityChange} aria-label="Change Priority">
                        {data?.priority === "low" || data?.priority === "medium" ? (
                            <FaRegStar className="text-2xl text-yellow-500 hover:text-yellow-600" />
                        ) : (
                            <FaStar className="text-2xl text-yellow-600 hover:text-yellow-700" />
                        )}
                    </button>
                </div>

                <button className='flex gap-2 items-center px-2 py-2 border-b-2'><IoMdAdd /> Add Step</button>
                <button className='flex gap-2 items-center px-2 py-2 border-b-2'>
                    <FaRegBell className='size-4' />
                    Set Reminder
                </button>
                <button className='flex gap-2 items-center px-2 py-2 border-b-2'>
                    <CiCalendar
                        className='size-4 font-bold'
                    // onClick={() => setTaskData({ ...taskData, deadline: "" })}
                    />
                    Add Due Date
                </button>
                <button className='flex gap-2 items-center px-2 py-2 border-b-2'>
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
            <div className='w-full flex justify-between px-2 py-3 items-center border-t-2'>
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
