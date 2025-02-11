import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import LoadingButton from "../utils/LodingButton";
import { clearState, login } from "../redux/slices/authSlice";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading, isLogged } = useSelector((state) => state.auth);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        if (isLogged) {
            navigate("/");
            setEmail("");
            setPassword("");
        }
    }, [isLogged]);

    return (
        <section className="h-[450px]  flex justify-center items-center dark:bg-[#242424] dark:text-white  bg-gray-50 py-3">
            <div className="w-[80%] md:w-[50%] h-full dark:bg-[#232323] dark:text-white bg-white shadow-lg rounded-md p-6 border-2 pb-5 ">
                <div className="text-center">
                    <h2 className="text-xl md:text-3xl font-bold dark:text-white text-black">Welcome Back!</h2>
                    <p className="mt-2 dark:text-white text-gray-600">Login to your account</p>
                </div>

                {error && <p className="text-red-500 py-2 text-center">{error}</p>}

                <form onSubmit={handleLogin} className="mt-6 space-y-5">
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
                        Login
                    </LoadingButton>

                    <p className="text-center dark:text-white text-gray-600">
                        Don’t have an account?{" "}
                        <Link
                            onClick={() => dispatch(clearState())}
                            to="/register"
                            className=" text-orange-500 hover:text-orange-600 hover:underline"
                        >
                            Create a free account
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};
