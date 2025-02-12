import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { onShow } from "../redux/slices/sideBarSlice";
import { BiSolidEdit } from "react-icons/bi";
import { deleteTask, updateTask } from "../redux/slices/todoSlice";

export const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.sidebar);
  const { isGrid } = useSelector((state) => state.themeAndLayout);


  const handlePriorityChange = () => {
    const newPriority = task.priority === "low" || task.priority === "medium" ? "high" : "low";

    dispatch(
      updateTask({
        id : task.id,
        data: { priority: newPriority } ,
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
      className={`bg-[#FBFDFC] dark:bg-[#232323] dark:text-white flex justify-between items-center py-2 px-4 border-b-2 dark:border-b-[0.5px] border-green-100  `}
      onClick={() => onShow(task)}
      >
        {/* Task Title and Checkbox */}
        <div className="flex gap-4 items-center">
          <input
            type="checkbox"
            checked={task.progress === "completed"}
            onChange={handleStatus}
            className="cursor-pointer"
            aria-label="Toggle Task Status"
          />
          <p className="text-lg dark:text-white text-gray-800">{task?.title}</p>
        </div>

        {/* Change Priority Button */}
        <button onClick={handlePriorityChange} aria-label="Change Priority">
          {task.priority === "low" || task.priority === "medium" ? (
            <FaRegStar className={`${isGrid ? " text-xl" : "text-2xl"} text-yellow-500 hover:text-yellow-600`} />
          ) : (
            <FaStar className={`${isGrid ? " text-xl" : "text-2xl"} text-yellow-600 hover:text-yellow-700`} />
          )}
        </button>
    </div>
  );
};
