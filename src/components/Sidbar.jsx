import React from "react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router";
import UserProfileIcon from "../components/UserProfileIcon";
import { IoTodayOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa6";
import { MdAssignmentInd, MdOutlineAssignment} from "react-icons/md";
import { TbBook } from "react-icons/tb";

import { logout } from "../redux/slices/authSlice";
import { BiInfoCircle, BiPlus } from "react-icons/bi";
import PrograssChart from "../components/PrograssChart";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const { user } = useSelector(state => state?.auth)
    const { tasks } = useSelector(state => state?.todos)
    const [isActive, setisActive] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation();
    const todayTask = 0
    const navigation = [
        {
            path: '/',
            name: 'All Tasks',
            icon: <MdOutlineAssignment />
        },
        {
            path: '/today',
            name: 'Today',
            icon: <IoTodayOutline />
        },
        {
            path: '/important',
            name: 'Important',
            icon: <FaRegStar />
        },
        {
            path: '/planned',
            name: 'Planned',
            icon: <TbBook />
        },
        {
            path: '/assigned',
            name: 'Assigned to me ',
            icon: <MdAssignmentInd />
        }
    ]


    const handelLogout = () => {
        dispatch(logout())
        setisActive(false)
    }



    return (<>
        <div className="flex flex-col pt-16">
            <div className="flex flex-col gap-1 dark:bg-[#2C2C2C] bg-[#EEF6EF] px-3 relative py-5 rounded-md">
                {/* user profile */}
                <div className="hidden md:flex justify-center items-center md:absolute top-[-35px] left-1/2 transform -translate-x-1/2">
                    {/* <img src="" alt="" /> */}
                    {user ?
                        <button onClick={() => setisActive(!isActive)}>
                            <UserProfileIcon user={user} />
                        </button>
                        :
                        <Link className="bg-[#357937E0] text-white font-bold px-3 py-1 rounded-md cursor-pointer" to={"/login"}>Login</Link>
                    }
                </div>
                {/* user actions button */}
                <div className={`${isActive ? "flex" : "invisible"} flex-col justify-center items-center z-10 pt-2 absolute`}>
                    <button onClick={() => setisActive(!isActive)} className="py-[2px] shadow-sm bg-[#FBFDFC] border-b-[2px] w-[70%] hover:text-green-400">My Profile</button>
                    <button onClick={handelLogout} className="py-[2px] shadow-sm bg-[#FBFDFC] w-[70%] hover:text-green-400">Logout</button>
                </div>
                {/* links */}
                <div className=" bg-[#FBFDFC] dark:bg-[#232323] dark:text-white shadow-md rounded-md flex items-center md:mt-9 py-4">
                    <ul className="text-sm font-medium flex-1">
                        {navigation.map((item, idx) => (
                            <li
                                key={idx}
                                className="group hover:bg-[#35793729] dark:hover:bg-[#2F3630] rounded-md"
                            >
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center text-sm gap-x-2 px-4 py-2 duration-150 rounded-md 
                    ${isActive ? "text-[#357937]" : "text-gray-600 dark:text-white"} 
                    group-hover:text-[#357937]`
                                    }
                                >
                                    <span>
                                        {React.cloneElement(item.icon, {
                                            className: `w-5 h-5 ${location.pathname === item.path
                                                    ? "text-[#357937] fill-[#357937]"
                                                    : "text-gray-500 dark:text-white group-hover:text-[#357937]"
                                                }`,
                                        })}
                                    </span>
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                </div>

                <button className="bg-[#FBFDFC] dark:bg-[#232323] dark:text-white shadow-md rounded-md flex gap-2 mt-1 py-3 px-3 items-center">
                    <BiPlus size={20} />
                    Add List
                </button>

                {/* Prograss Chart */}
                <div className="w-full bg-[#FBFDFC] dark:bg-[#232323] dark:text-white shadow-md rounded-md mt-1 px-3 py-1 ">
                    <div className="flex justify-between">
                        <span>
                            <p className="text-[10px]">Today Tasks</p>
                            <h3>{todayTask}</h3>
                        </span>
                        <BiInfoCircle />
                    </div>
                    <div className="flex flex-col justify-center">
                        <PrograssChart tasks={tasks} />
                    </div>
                </div>
            </div>
        </div >
    </>);
};

export default Sidebar;