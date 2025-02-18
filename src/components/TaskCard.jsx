import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidEdit } from "react-icons/bi";
import {  updateTask } from "../redux/slices/todoSlice";
import { RightSidebar } from "./RightSidebar";

export const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const { isGrid } = useSelector((state) => state.themeAndLayout);
  const [isEditBar, setIsEditBar] = useState(false)

  const [formData, setFormData] = useState({ ...task })
  
  const handelChange = (e) => {
    const { name, value } = e.target

    if (name === "steps") {
      setFormData((prev) => ({
        ...prev,
        steps: [...prev?.steps, value]
      }));
      return
    }
    if (name === "reminders") {
      const formateDate = new Date(value)
      setFormData((prev) => ({
        ...prev,
        reminders: [...prev?.reminders, value],
      }));
    }
    else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const toggleEditBar = () => {
    setIsEditBar(!isEditBar)
  }

  const handlePriorityChange = () => {
    const newPriority = task.priority === "low" || task.priority === "medium" ? "high" : "low";

    dispatch(
      updateTask({
        id: task.id,
        data: { priority: newPriority },
      })
    );
  };

  

  const handleStatus = () => {
    const newProgress = task.progress === "pending" ? "completed" : "pending";

    dispatch(
      updateTask({
        id: task.id,
        data: { progress: newProgress }
      })
    );
  };

const handleUpdateTask = ()=>{
   dispatch(
    updateTask({
      id: task.id,
      data: formData
    })
  )
  toggleEditBar(false)
}

// styles
  const cardContStyling = `bg-[#FBFDFC] cursor-pointer dark:bg-[#232323] dark:text-white flex justify-between items-baseline  md:items-center  ${isGrid ? "shadow-md py-5 px-2 rounded-md text-sm/2 md:text-md" : "border-b-2 dark:border-b-[0.5px] py-4 px-4"}  border-green-100  transition-all`

  const getCss = () => `
  dark:bg-[#232323] dark:text-white bg-green-100 shadow-md shadow-black dark:shadow-white 
  border-[0.5px] rounded-sm overflow-y-auto transition-all duration-300 
  transform z-40

  /* Small Screen Styles */
  rounded-t-3xl absolute bottom-0 h-[85vh] left-1 right-1 pt-4
  ${isEditBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}

  /* Medium Screen Styles */
  md:w-[30%] md:right-0 md:rounded-none md:top-0 md:left-auto md:bottom-auto
`;

  return (
    <div
      className={cardContStyling}

    >
      {/* Task Title and Checkbox */}
      <div className="flex gap-1 md:gap-4 items-baseline md:items-center">
        <input
          type="checkbox"
          checked={task.progress === "completed"}
          onChange={handleStatus}
          className="cursor-pointer"
          aria-label="Toggle Task Status"
        />
        <p className="text-sm md:text-lg first-letter:uppercase dark:text-white text-gray-800 flex flex-wrap">{task?.title}</p>
      </div>

      <div className="flex gap-3 items-center pr-4">
        {/* Change Priority Button */}
        <button onClick={handlePriorityChange} aria-label="Change Priority">
          {task.priority === "low" || task.priority === "medium" ? (
            <FaRegStar className={`text-md md:text-2xl text-black dark:text-white`} />
          ) : (
            <FaStar className={`text-md md:text-2xl text-black dark:text-white`} />
          )}
        </button>

        <button onClick={toggleEditBar}>
          <BiSolidEdit className={`text-md md:text-2xl text-black dark:text-white`} />
        </button>
      </div>




      {/* Right Sidebar */}
        { isEditBar && (
        <div className={getCss()}>
            <form>
            <RightSidebar handelChange={handelChange} toggleRightForm={toggleEditBar} formData={formData} formType={"edit"} handleAdd={handleUpdateTask}/>
            </form>
          </div>
        )}
    </div>
  );
};
