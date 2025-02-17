import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import LoadingButton from "../components/LodingButton";
import { clearState, register } from "../redux/slices/authSlice";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { success, error, loading} = useSelector(state => state.auth)

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Dispatch the registration action
    dispatch(register({ name, email, password }));
  };

  useEffect(()=>{
    if(success){
      setEmail("")
      setName("")
      setPassword("")
      navigate("/login")
      // dispatch(clearState())
    }
  },[success])
  return (<>
  
    

    <section className="h-auto flex justify-center items-center dark:bg-[#242424] dark:text-white  bg-gray-50 py-3">
      <div className="w-[95%] md:w-[50%] h-full dark:bg-[#232323] dark:text-white bg-white shadow-lg rounded-md p-6 pb-5 ">
        <div className="text-center">
          <h2 className="text-xl md:text-3xl font-bold dark:text-white text-black">Create a New Account</h2>
          <p className="mt-2 dark:text-white text-gray-600">Register to access all features</p>
        </div>

        {error && <p className="text-red-500 py-2 text-center">{error}</p>}

        <form onSubmit={handleRegister} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm md:text-base font-medium dark:text-white text-gray-900">
              Full Name
            </label>
            <div className="mt-2.5 relative">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                placeholder="Enter Full Name"
                className="w-full py-1 md:py-3 px-4 text-black placeholder-gray-500 bg-gray-100 border rounded-md focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium dark:text-white text-gray-900">
              Email address
            </label>
            <div className="mt-2.5 relative">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="Enter email"
                className="w-full py-1 md:py-3 px-4 text-black placeholder-gray-500 bg-gray-100 border rounded-md focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium dark:text-white text-gray-900">
              Password
            </label>
            <div className="mt-2.5 relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                value={password}
                type="password"
                placeholder="Enter your password"
                className="w-full py-1 md:py-3 px-4 text-black placeholder-gray-500 bg-gray-100 border rounded-md focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <LoadingButton loading={loading} type="submit">
            Register
          </LoadingButton>

          <p className="text-center dark:text-white text-gray-600">
            Already have an account?{" "}
            <Link
              onClick={() => dispatch(clearState())}
              to="/login"
              className="hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  </>
  );
};
