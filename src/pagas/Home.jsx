import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../redux/slices/todoSlice";
import { AddTask } from "../components/AddTask";
import { TaskContener } from "../components/TaskContener";
import { AiOutlineInbox } from "react-icons/ai"; // Import an icon

const Home = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      {/* Add Task Component */}
      <AddTask />

      {/* Task Container */}
      <div className="flex justify-center rounded-lg m-auto p-4">
        {tasks?.length === 0 ? (
          <div className="p-5">
            <div className="flex flex-col border-2 items-center text-gray-500 p-5 rounded-md">
              <AiOutlineInbox size={50} className="mb-2 text-gray-400" />
              <p className="text-lg font-semibold">You have no tasks yet!</p>
              <p className="text-sm">Start by adding a new task to get organized.</p>
            </div>
          </div>
          
        ) : (
          <TaskContener />
        )}
      </div>
    </div>
  );
};

export default Home;
