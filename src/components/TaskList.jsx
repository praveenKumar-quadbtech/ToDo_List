import { useState } from "react";
import { TaskCard } from "./TaskCard";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";


const TaskList = ({ title, tasks, icon: Icon, emptyMessage, isGrid, isRightBar }) => {
    const [isComplateList, setIsComplateList] = useState(true)


    return (
        <>
            <div className="flex gap-3 items-center py-3">
                {title === "Completed Task" ? <button onClick={() => setIsComplateList(!isComplateList)}>
                    {isComplateList ? <FaAngleDown size={25} /> :
                        <FaAngleUp size={25} />}
                </button> : null}
                <h3 className="text-md md:text-lg dark:text-white">{title}</h3>
            </div>
           {isComplateList && <>
                {tasks.length === 0 ? (
                    <div className="bg-white dark:bg-[#232323] flex flex-col justify-center items-center shadow-md rounded-lg p-3  dark:text-white text-gray-500">
                        <Icon size={40} className="text-gray-400 mb-2" />
                        <h3 className="text-lg font-semibold">{emptyMessage}</h3>
                    </div>
                ) : (
                    <div className={`transition-all duration-300 ${isGrid ? isRightBar ? "grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2" : "grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3" : "flex flex-col"} `}>
                        {tasks.map((task, idx) => (
                            <TaskCard key={idx} task={task} />
                        ))}
                    </div>
                )}
            </>}
        </>
    )
}

export default TaskList
