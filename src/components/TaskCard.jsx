import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { onShow } from "../redux/slices/sideBarSlice";
import { BiSolidEdit } from "react-icons/bi";
import { deleteTask, updateTask } from "../redux/slices/todoSlice";
import { RightSidebar } from "./RightSidebar";

export const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.sidebar);
  const { isGrid } = useSelector((state) => state.themeAndLayout);


  const handlePriorityChange = () => {
    const newPriority = task.priority === "low" || task.priority === "medium" ? "high" : "low";

    dispatch(
      updateTask({
        id: task.id,
        data: { priority: newPriority },
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTask({ id: task.id }));
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

  return (
    <div
      className={`bg-[#FBFDFC] cursor-pointer dark:bg-[#232323] dark:text-white flex justify-between items-baseline  md:items-center  ${isGrid ? "shadow-md py-5 px-2 rounded-md text-sm/2 md:text-md" : "border-b-2 dark:border-b-[0.5px] py-2 px-4"}  border-green-100  transition-all`}

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

      {/* Change Priority Button */}
      <button onClick={handlePriorityChange} aria-label="Change Priority">
        {task.priority === "low" || task.priority === "medium" ? (
          <FaRegStar className={`text-md md:text-2xl text-black dark:text-white`} />
        ) : (
            <FaStar className={`text-md md:text-2xl text-black dark:text-white`} />
        )}
      </button>
      


      {/* Right Sidebar */}
      {/* {isEditBar ? (
        <div className="absolute border-2 right-0 top-0 w-[30%] transition-all duration-300  transform translate-x-0 opacity-100">
          <form >
            <RightSidebar handelChange={() => { }} toggleRightForm={toggleEditBar} formData={task} />
          </form>
        </div>
      ) : (
        <div className="absolute border-2 right-0 top-0 w-[29%] 
                                              transition-all duration-300  transform translate-x-full opacity-0">
        </div>
      )} */}
    </div>
  );
};
