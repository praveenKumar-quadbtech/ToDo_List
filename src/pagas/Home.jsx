import { useEffect } from "react";
import { AddTask } from "../components/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/actions/task";
import { Loading } from "../utils/Loading";
import { TaskContener } from "../components/TaskContener";
import { useNavigate } from "react-router";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);
  const { items, isFetching, error } = useSelector(state => state.todos);


  useEffect(() => {
    if (token) {
      dispatch(fetchTodos({ token, navigate }));
    }
  }, [dispatch, token, navigate]);

  if (isFetching) {
    return (
      <div className="flex h-[400px] justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <AddTask />
      <div className="flex justify-center border-2 m-auto px-2 py-3 ">
        {error ? (
          <div className="text-red-700 p-4">{error.massage}</div>
        ) : items?.length === 0 ? (
          <div className="p-4">No task found</div>
        ) : (
          <TaskContener />
        )}
      </div>
    </>
  );
};

export default Home;
