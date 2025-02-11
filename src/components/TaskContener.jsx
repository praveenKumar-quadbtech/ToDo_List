import {  AiOutlineCheckCircle, AiOutlineInbox } from "react-icons/ai";
import { TaskCard } from "./TaskCard";
import { useSelector } from "react-redux";
import themeAndLayoutSlice from './../redux/slices/themeAndLayoutSlice';

export const TaskContener = () => {
    const { tasks } = useSelector((state) => state.todos);
    const {isGrid} = useSelector((state) => state.themeAndLayout);
   
    const pendingTask = tasks?.filter((task) => task.progress === "pending");
    const completedTask = tasks?.filter((task) => task.progress === "completed");
    pendingTask.reverse()
    completedTask.reverse()
    
    return (
        <div className={`flex flex-col gap-5 w-full max-w-3xl dark:bg-[#242424] dark:text-white `}>
            <>
                <h3>Pending Task</h3>
                {pendingTask?.length === 0 ? (
                    <div className={`bg-white flex flex-col justify-center items-center shadow-md rounded-lg p-6 mb-4 border text-gray-500`}>
                        <AiOutlineInbox size={40} className="text-gray-400 mb-2" />
                        <h3 className="text-lg font-semibold">No Pending Tasks</h3>
                        <p className="text-sm text-gray-400">Start by adding a new task!</p>
                    </div>
                ) : (
                        <div
                            className={`gap-3 transition-all duration-300 ${isGrid ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "flex flex-col"
                                }`}
                        >

                        {pendingTask?.map((task, idx) => (
                            <TaskCard key={idx} task={task} />
                        ))}
                    </div>
                )}
            </>

            <>
                <h3>Completed Task</h3>
                {completedTask.length === 0 ? (
                    <div className="bg-white flex flex-col justify-center items-center shadow-md rounded-lg p-6 mb-4 border text-gray-500">
                        <AiOutlineCheckCircle size={40} className="text-gray-400 mb-2" />
                        <h3 className="text-lg font-semibold">No Completed Tasks</h3>
                        <p className="text-sm text-gray-400">Mark tasks as done to see them here!</p>
                    </div>
                ) : (
                        <div
                            className={`gap-3 transition-all duration-300 ${isGrid ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "flex flex-col"
                                }`}
                        >

                        {completedTask?.map((task, idx) => (
                            <TaskCard key={idx} task={task} />
                        ))}
                    </div>
                )}
            </>
        </div>
    );
};
