import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../redux/slices/todoSlice";
import { AddTask } from "../components/AddTask";
import { TaskContainer } from "../components/TaskContener";
import { useNavigate } from "react-router";

const Home = ({ isRightBar, toggleRightBar, isLeftBar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged } = useSelector(state => state.auth);
  const { tasks } = useSelector(state => state.todos);
  const [addNew, setAddNew] = useState(false);

 
  

  const getWidthClass = () => {
    if (isRightBar  && isLeftBar) return "w-full md:w-[58%]";
    if (isRightBar ) return "w-full md:w-[67%]";
    return "w-full";
  };

  const toggleTaskForm = (status) => {
    if (!isLogged) {
      navigate("/login");
      return;
    }
    setAddNew(status);
  };

  useEffect(() => {
    if (isLogged) {
      dispatch(getTasks());
    }
    console.log(tasks);
  }, [dispatch, isLogged]);

 
  return (
    <div className={`dark:bg-[#232323]`}>
      <div className={`transition-all duration-300 ${getWidthClass()}`}>
        <h3 className="py-1 border-t-[1px] dark:border-0 dark:text-white">ToDo</h3>

        {/* Add Task Component */}
        <AddTask
          addNew={addNew}
          toggleTaskForm={toggleTaskForm}
          toggleRightForm={toggleRightBar}
          isRightForm={isRightBar}
        />

        {/* Task Container */}
        <TaskContainer toggleTaskForm={toggleTaskForm} isRightBar ={isRightBar}/>
      </div>
    </div>
  );
};

export default Home;
