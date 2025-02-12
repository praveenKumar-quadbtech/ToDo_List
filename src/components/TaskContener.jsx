import { AiOutlineCheckCircle, AiOutlineInbox } from "react-icons/ai";
import { TaskCard } from "./TaskCard";
import { useSelector } from "react-redux";
import themeAndLayoutSlice from './../redux/slices/themeAndLayoutSlice';

export const TaskContainer = ({ toggleTaskForm  }) => {
    const { tasks } = useSelector((state) => state.todos);
    const { isGrid } = useSelector((state) => state.themeAndLayout);

    const pendingTask = tasks?.filter((task) => task.progress === "pending");
    const completedTask = tasks?.filter((task) => task.progress === "completed");
    pendingTask.reverse()
    completedTask.reverse()

    if (!tasks || tasks?.length === 0) {
        return <div className="flex justify-center rounded-lg m-auto p-4">
            <div className="p-5">
                <div className="flex flex-col border-2 items-center text-gray-500 p-5 rounded-md">
                    <AiOutlineInbox size={50} className="mb-2 text-gray-400" />
                    <p className="text-lg font-semibold">You have no tasks yet!</p>
                    <p className="text-sm">Start by adding a new task to get organized.</p>
                </div>
            </div>
        </div>
    }

    return (
        <div className={`flex flex-col w-full dark:bg-[#242424] gap-2 dark:text-white`} onClick={() => toggleTaskForm(false)}>
            <>
                <h3 className="py-2">Pending Task</h3>
                {pendingTask?.length === 0 ? (
                    <div className={`bg-white flex flex-col justify-center items-center shadow-md rounded-lg p-6 mb-4 border text-gray-500`}>
                        <AiOutlineInbox size={40} className="text-gray-400 mb-2" />
                        <h3 className="text-lg font-semibold">No Pending Tasks</h3>
                        <p className="text-sm text-gray-400">Start by adding a new task!</p>
                    </div>
                )
                    :
                    (
                        <div
                            className={` transition-all duration-300 ${isGrid ? "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3" : "flex flex-col"
                                }`}
                        >

                            {pendingTask?.map((task, idx) => (
                                <TaskCard key={idx} task={task} />
                            ))}
                        </div>
                    )}
            </>

            <>
                <h3 className="py-2">Completed Task</h3>
                {completedTask.length === 0 ? (
                    <div className="bg-white flex flex-col justify-center items-center shadow-md rounded-lg p-6 mb-4 border text-gray-500">
                        <AiOutlineCheckCircle size={40} className="text-gray-400 mb-2" />
                        <h3 className="text-lg font-semibold">No Completed Tasks</h3>
                        <p className="text-sm text-gray-400">Mark tasks as done to see them here!</p>
                    </div>
                )
                    :
                    (
                        <div
                            className={`transition-all duration-300 ${isGrid ? "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3" : "flex flex-col"
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
