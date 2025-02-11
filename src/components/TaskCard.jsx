import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { onOpen } from "../redux/slices/sideBarSlice";
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
      className={`bg-white dark:bg-[#232323] dark:text-white flex ${isGrid ? "flex-col" : "justify-between items-center"} shadow-md rounded-lg p-2 mb-4 border`}>
      <div className="dark:text-white">
        {/* Task Title and Deadline */}
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={task.progress === "completed"}
            onChange={handleStatus}
            className="cursor-pointer"
            aria-label="Toggle Task Status"
          />
          <h3 className="text-lg font-bold dark:text-white text-gray-800">{task?.title}</h3>
        </div>

        <p className="text-sm dark:text-white text-gray-500">
          Deadline:{" "}
          <span className="text-gray-800 dark:text-white font-semibold">
            {new Date(task?.deadline).toLocaleDateString()}
          </span>
        </p>

        {/* Task Priority and Progress */}
        <div className="flex gap-4 mt-2">
          <p className="text-sm dark:text-white text-gray-500">
            Priority:{" "}
            <span
              className={`font-semibold ${task?.priority === "high"
                ? "text-red-600"
                : task.priority === "medium"
                  ? "text-yellow-500"
                  : "text-green-600"
                }`}
            >
              {task.priority}
            </span>
          </p>
          <p className="text-sm dark:text-white text-gray-500">
            Progress:{" "}
            <span
              className={`font-semibold ${task.progress === "pending" ? "text-yellow-500" : "text-green-600"
                }`}
            >
              {task.progress}
            </span>
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className={`flex gap-4 ${isGrid ? "mt-2" : ""}`}>
        {!isOpen && <BiSolidEdit
          onClick={() => dispatch(onOpen(task))}
          className={`${isGrid ? "text-xl" : "text-2xl"} cursor-pointer`}
        />}
        {/* Delete Button */}
        <button onClick={handleDelete} aria-label="Delete Task">
          <MdDeleteForever className={`${isGrid ? " text-xl" : "text-2xl"} text-red-600 hover:text-red-800`} />
        </button>
        {/* Change Priority Button */}
        <button onClick={handlePriorityChange} aria-label="Change Priority">
          {task.priority === "low" || task.priority === "medium" ? (
            <FaRegStar className={`${isGrid ? " text-xl" : "text-2xl"} text-yellow-500 hover:text-yellow-600`} />
          ) : (
          <FaStar className={`${isGrid ? " text-xl" : "text-2xl"} text-yellow-600 hover:text-yellow-700`} />
          )}
        </button>
      </div>
    </div>
  );
};
