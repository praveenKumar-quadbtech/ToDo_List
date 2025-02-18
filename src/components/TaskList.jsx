import { TaskCard } from "./TaskCard";

const TaskList = ({ title, tasks, icon: Icon, emptyMessage, isGrid, isRightBar }) => (
    <>
        <h3 className="text-md md:text-lg py-2 dark:text-white">{title}</h3>
        {tasks.length === 0 ? (
            <div className="bg-white dark:bg-[#232323] flex flex-col justify-center items-center shadow-md rounded-lg p-3  dark:text-white text-gray-500">
                <Icon size={40} className="text-gray-400 mb-2" />
                <h3 className="text-lg font-semibold">{emptyMessage}</h3>
            </div>
        ) : (
                <div className={`transition-all duration-300 ${isGrid ? isRightBar ? "grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2" :    "grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3" : "flex flex-col"} `}>
                {tasks.map((task, idx) => (
                    <TaskCard key={idx} task={task} />
                ))}
            </div>
        )}
    </>
);

export default TaskList
