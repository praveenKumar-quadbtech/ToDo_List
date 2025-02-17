import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp, IoRepeatOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaRegBell, FaStar, FaRegStar } from "react-icons/fa";
import { deleteTask } from "../redux/slices/todoSlice";
import { updateTodo } from "../redux/actions/task";
import { AddStaps } from "../components/AddStaps";
import MyDatePicker from "../components/DatePeaker";
import SetReminder from "./SetReminder";
import { ShowSteps } from "./ShowSteps";
import { ShowReminders } from "./ShowReminders";

export const RightSidebar = ({ toggleRightForm, handelChange, formData }) => {
    const dispatch = useDispatch();
    const [stepsCount, setStepsCount] = useState(0);
    const [step, setStep] = useState("");
    const [isStepAdd, setisStepAdd] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [isErr, setErr] = useState("")
    console.log(formData);


    const handleStepKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setisStepAdd(false)
            let newStep = e.target.value;
            if (newStep.trim() !== "") {
                handelChange({
                    target: { name: "steps", value: newStep }
                });
            }
            e.target.value = "";
        }
    };


    const handleDelete = () => {
        dispatch(deleteTask({ id: formData._id }));
        dispatch(onClose());
    };


    const handleStatusToggle = () => {
        const newProgress = formData.progress === "pending" ? "completed" : "pending";
        dispatch(updateTodo({ id: formData._id, data: { ...formData, progress: newProgress } }));
    };

    const handlePriorityToggle = () => {
        const newPriority = formData.priority === "low" || formData.priority === "medium" ? "high" : "low";
        dispatch(updateTodo({ id: formData._id, data: { ...formData, priority: newPriority } }));
    };

    useEffect(() => {
        setErr("")
    }, [formData])

    return (
        <div className="w-100% bg-green-50 dark:bg-[#232323] dark:text-white flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-2 text-sm">
                {/* Title Input */}

                <span className="border-b-[0.5px] border-black dark:border-green-100 py-2 px-3">
                    <input
                        className="w-full focus:border-[0.5px] rounded-md dark:bg-[#2c2c2c] dark:text-white px-3 py-1  border-black dark:border-green-100 outline-none"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={(e) => handelChange(e)}
                    />
                </span>
                {/* Steps cont */}
                <span className="border-b-[0.5px] border-black dark:border-green-100 py-2 px-3 flex flex-col gap-1">
                    {/* show steps */}
                    {formData?.steps?.length !== 0 ? <ShowSteps steps={formData?.steps} /> : null}

                    {/* Add Steps */}
                    {isStepAdd ?
                        <AddStaps handleStepKeyDown={handleStepKeyDown} removeStep={() => setisStepAdd(false)} step={step} />
                        :
                        <button onClick={() => setisStepAdd(true)} className="text-sm flex gap-2 items-center">
                            <IoMdAdd /> Add Step
                        </button>
                    }
                </span>

                {/*due Date Picker */}
                <MyDatePicker handleChange={handelChange} date={formData?.deadline} />

                {/* Set Reminder */}
                <div className="flex flex-col gap-2 px-3 py-2 border-b-[0.5px] text-sm border-black dark:border-green-100">
                    {formData?.reminders?.length !== 0 ? <ShowReminders reminders={formData?.reminders} /> : null}
                    {isErr && <p className="text-red-500 text-sm">{isErr}</p>}
                    {
                        !isOpen ?
                            <span
                                onClick={() => {
                                    if (formData?.deadline) {
                                        setIsOpen(true)
                                        setErr("")
                                    }
                                    else {
                                        setErr("Please first select a due date")
                                    }
                                }}
                                className='cursor-pointer flex gap-3 items-center'>
                                <FaRegBell className='size-3' />
                                Set Reminder
                            </span>
                            :
                            <SetReminder
                                deadline={formData?.deadline}
                                handelChange={handelChange}
                                setIsOpen={setIsOpen}
                                isOpen={isOpen}
                            />
                    }
                </div>

                {/* Repeat Selection */}
                <div className="flex items-center gap-2 border-b-[0.5px] border-black dark:border-green-100 px-3 py-2">
                    <IoRepeatOutline className="size-4 font-bold dark:text-white" />
                    <select
                        name="repeat"
                        onChange={handelChange}
                        value={formData?.repeat}
                        className="px-4 py-1.5 border-2 dark:border-none text-sm rounded-md dark:bg-[#2c2c2c] dark:text-white">
                        <option value="norepeat">No Repeat</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>

                {/* Notes Input */}
                <span className="border-b-[0.5px] border-black dark:border-green-100 px-3 py-1">
                    <textarea
                        className="w-[90%] m-auto py-1 px-2  rounded-md focus:border-[0.5px] dark:bg-[#2c2c2c] dark:text-white  border-black dark:border-green-100 outline-none"
                        placeholder="Add Notes"
                        rows="2"
                        value={formData?.description}
                        name="description"
                        onChange={handelChange}
                    ></textarea>
                </span>

            </div>

            {/* Footer */}
            <div className="w-full flex justify-between px-2 py-3 items-center border-b border-green-100">
                <IoCloseSharp onClick={() => toggleRightForm(false)} className="cursor-pointer size-6" />
                <p>Created Today</p>
                <MdDeleteForever onClick={handleDelete} className="cursor-pointer size-6" />
            </div>
        </div>
    );
};
