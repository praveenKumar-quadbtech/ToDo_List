import { AiOutlineCheckCircle, AiOutlineInbox } from "react-icons/ai";
import { useSelector } from "react-redux";
import TaskList from "./TaskList";

export const TaskContainer = ({ toggleTaskForm, isRightBar }) => {
    const { tasks } = useSelector((state) => state.todos);
    const { isGrid } = useSelector((state) => state.themeAndLayout);

    const pendingTask = tasks?.filter((task) => task.progress === "pending").slice().reverse();
    const completedTask = tasks?.filter((task) => task.progress === "completed").slice().reverse();


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
        <div className={`flex flex-col w-full dark:bg-[#242424] gap-2 dark:text-white transition-all`} onClick={() => toggleTaskForm(false)}>
            <TaskList
                isGrid={isGrid}
                title="Pending Task"
                tasks={pendingTask}
                icon={AiOutlineInbox}
                emptyMessage="No Pending Tasks"
                isRightBar={isRightBar}
            />
            <TaskList
                isGrid={isGrid}
                title="Completed Task"
                tasks={completedTask}
                icon={AiOutlineCheckCircle}
                emptyMessage="No Completed Tasks"
                isRightBar={isRightBar}
            />
        </div>
    );

};
