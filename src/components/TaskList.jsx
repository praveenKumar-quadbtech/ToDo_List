import { TaskCard } from "./TaskCard";

const TaskList = ({ title, tasks, icon: Icon, emptyMessage, isGrid, isEditBar, toggleEditBar }) => (
    <>
        <h3 className="text-md md:text-lg py-2">{title}</h3>
        {tasks.length === 0 ? (
            <div className="bg-white flex flex-col justify-center items-center shadow-md rounded-lg p-6 mb-4 border text-gray-500">
                <Icon size={40} className="text-gray-400 mb-2" />
                <h3 className="text-lg font-semibold">{emptyMessage}</h3>
            </div>
        ) : (
            <div className={`transition-all duration-300 ${isGrid ? "grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3" : "flex flex-col"}`}>
                {tasks.map((task, idx) => (
                    <TaskCard key={idx} task={task} />
                ))}
            </div>
        )}
    </>
);

export default TaskList
