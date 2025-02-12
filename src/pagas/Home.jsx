import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../redux/slices/todoSlice";
import { AddTask } from "../components/AddTask";
import { TaskContainer } from "../components/TaskContener";
import { AiOutlineInbox } from "react-icons/ai"; // Import an icon
import { useNavigate } from "react-router";

const Home = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.todos);
  const [addNew, setAddNew] = useState(false)
  const { isLogged } = useSelector(state => state.auth);
  const navigate = useNavigate()

  const toggleTaskForm = (status) => {
    if (isLogged) {
      setAddNew(status)
    }
    else {
      navigate("/login")
    }
  }

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div className="w-full dark:bg-[#232323]" >
      <h3 className="py-1 border-t-[1px] dark:border-0 dark:text-white">ToDo</h3>
      {/* Add Task Component */}
      <AddTask addNew={addNew} toggleTaskForm={toggleTaskForm}/>

      {/* Task Container */}
      <TaskContainer toggleTaskForm={toggleTaskForm} />
    </div>
  );
};

export default Home;
