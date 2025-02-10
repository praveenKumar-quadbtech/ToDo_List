import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, updateTodo } from "../redux/actions/task";
import { onOpen } from "../redux/slices/sideBarSlice";
import { BiSolidEdit } from "react-icons/bi";

export const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.sidebar);

  const handlePriorityChange = () => {
    const newPriority = task.priority === "low" || task.priority === "medium" ? "high" : "low";

    dispatch(
      updateTodo({
        token,
        id: task._id,
        data: { ...task, priority: newPriority },
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo({ token, id: task._id }));
  };

  const handleStatus = () => {
    const newProgress = task.progress === "pending" ? "completed" : "pending";

    dispatch(
      updateTodo({
        token,
        id: task._id,
        data: { ...task, progress: newProgress },
      })
    );
  };

  return (
    <div 
    className="bg-white flex justify-between items-center shadow-md rounded-lg p-5 mb-4 border">
      <div>
        {/* Task Title and Deadline */}
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={task.progress === "completed"}
            onChange={handleStatus}
            className="cursor-pointer"
            aria-label="Toggle Task Status"
          />
          <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
        </div>

        <p className="text-sm text-gray-500">
          Deadline:{" "}
          <span className="text-gray-800 font-semibold">
            {new Date(task.deadline).toLocaleDateString()}
          </span>
        </p>

        {/* Task Priority and Progress */}
        <div className="flex gap-4 mt-2">
          <p className="text-sm text-gray-500">
            Priority:{" "}
            <span
              className={`font-semibold ${task.priority === "high"
                  ? "text-red-600"
                  : task.priority === "medium"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
            >
              {task.priority}
            </span>
          </p>
          <p className="text-sm text-gray-500">
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
      <div className="flex gap-4">
        {!isOpen && <BiSolidEdit
          onClick={() => dispatch(onOpen(task))}
         className="text-2xl cursor-pointer" 
         />}
        {/* Delete Button */}
        <button onClick={handleDelete} aria-label="Delete Task">
          <MdDeleteForever className="text-2xl text-red-600 hover:text-red-800" />
        </button>
        {/* Change Priority Button */}
        <button onClick={handlePriorityChange} aria-label="Change Priority">
          {task.priority === "low" || task.priority === "medium" ? (
            <FaRegStar className="text-2xl text-yellow-500 hover:text-yellow-600" />
          ) : (
            <FaStar className="text-2xl text-yellow-600 hover:text-yellow-700" />
          )}
        </button>
      </div>
    </div>
  );
};
