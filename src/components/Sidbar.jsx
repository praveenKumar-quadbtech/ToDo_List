import React from "react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router";
import UserProfileIcon from "../utils/UserProfileIcon";
import { IoTodayOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa6";
import { MdAssignmentInd, MdOutlineAssignment} from "react-icons/md";
import { TbBook } from "react-icons/tb";

import { logout } from "../redux/slices/authSlice";
import { BiInfoCircle, BiPlus } from "react-icons/bi";
import PrograssChart from "../utils/PrograssChart";

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
        {/* md and below screen sidebar */}
        <div className="flex flex-col h-full">
            <div className="h-[10%]">
            </div>
            <div className="flex flex-col gap-1 h-[90%] dark:bg-[#2C2C2C] bg-[#EEF6EF] px-3 relative">
                {/* user profile */}
                <div className="flex justify-center items-center absolute top-[-35px] left-1/2 transform -translate-x-1/2">
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
                <div className={`${isActive ? "flex" : "invisible"} flex-col justify-center items-center z-10 pt-2 h-[13%]`}>
                    <button onClick={() => setisActive(!isActive)} className="py-[2px] shadow-sm bg-[#FBFDFC] border-b-[2px] w-[70%] hover:text-green-400">My Profile</button>
                    <button onClick={handelLogout} className="py-[2px] shadow-sm bg-[#FBFDFC] w-[70%] hover:text-green-400">Logout</button>
                </div>
                {/* links */}
                <div className=" bg-[#FBFDFC] dark:bg-[#232323] dark:text-white shadow-md rounded-md flex items-center h-[43%]">
                    <ul className="text-sm font-medium flex-1">
                        {navigation.map((item, idx) => (
                            <li key={idx} className="hover:text-[#357937] hover:bg-green-50">
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center text-sm gap-x-2 px-4 py-2 duration-150 ${isActive
                                            ? "text-[#357937] bg-green-50 dark:bg-[#2F3630]"
                                            : "text-gray-600 dark:text-white hover:text-[#357937] hover:bg-green-50 dark:hover:bg-[#2F3630] dark:hover:text-[#357937]"
                                        }`
                                    }
                                >
                                    <span>
                                        {React.cloneElement(item.icon, {
                                            className: `w-5 h-5 hover:text-[#357937] hover:bg-green-50 ${location.pathname === item.path
                                                ? "text-[#357937] fill-[#357937]"
                                                : "text-gray-500 dark:text-white"
                                                }`,
                                        })}
                                    </span>
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="bg-[#FBFDFC] dark:bg-[#232323] dark:text-white shadow-md rounded-md flex gap-2 mt-1 py-3 px-3 items-center h-[10%]">
                    <BiPlus size={20} />
                    Add List
                </button>

                {/* Prograss Chart */}
                <div className="w-full bg-[#FBFDFC] dark:bg-[#232323] dark:text-white shadow-md rounded-md mt-1 px-3 py-1 h-[25%]">
                    <div className="flex justify-between h-[30%]">
                        <span>
                            <p className="text-[10px]">Today Tasks</p>
                            <h3>{todayTask}</h3>
                        </span>
                        <BiInfoCircle />
                    </div>
                    <div className="h-[70%]">
                        <PrograssChart data={tasks} />
                    </div>
                </div>
            </div>
        </div >




        {/* sm screen side bar  */}
        {/* <div className={`fixed h-screen w-[250px] bg-green-50 px-4 border-r-2 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-5000 ease-in-out`}>
            <div className='mt-2 p-2 rounded-md bg-white shadow-lg '>
                {user ?
                    <div className="w-full md:px-2 flex flex-col bg-white">
                        <div className="flex justify-between items-center">
                            <UserProfileIcon user={user} />
                            <span onClick={() => setisActive(!isActive)} className="cursor-pointer">
                                {isActive ? <IoIosArrowDropdownCircle /> : <IoIosArrowDropupCircle />}
                            </span>
                        </div>
                        <div className={`w-full py-2  justify-end ${isActive ? "flex" : "hidden"}`}>
                            <button onClick={handelLogout} className="bg-black text-white text-sm font-bold px-2 py-1 rounded-md cursor-pointer">Logout</button>
                        </div>
                    </div>
                    :
                    <div className="w-full flex justify-center items-center gap-x-4 bg-white py-3 mt-1 shadow-md rounded-md">
                        <Link onClick={toggleSidebar} className="bg-black text-white font-bold px-3 py-1 rounded-md cursor-pointer" to={"/login"}>Login</Link>
                    </div>
                }
            </div>
            <div className="flex flex-col justify-between h-full overflow-auto ">
                <div className="">
                    <ul className="text-sm font-medium flex-1 bg-white py-3 mt-1 shadow-md rounded-sm">
                        {
                            navigation.map((item, idx) => (
                                <li key={idx} onClick={toggleSidebar}>
                                    <Link to={item.path} className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-green-50 active:bg-gray-100 duration-150">
                                        <div className="text-gray-500">{item.icon}</div>
                                        {item.name}
                                    </Link>
                                </li>
                            ))
                        }

                    </ul>
                    <button className="px-5 py-7 text-start w-full mt-3 bg-white shadow-md rounded-md">Add list</button>
                </div>
                <div className="bg-white px-3 py-3 mt-1 shadow-md rounded-md">
                    <h4>Today Tasks</h4>
                    <h3>{todayTask}</h3>
                </div>
                <div className="pt-2 mt-2 border-t bg-white shadow-md rounded-md">
                    <ul className="text-sm font-medium">
                        {
                            navsFooter.map((item, idx) => (
                                <li key={idx}>
                                    <Link to={item.path} className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-green-50 active:bg-gray-100 duration-150">
                                        <div className="text-gray-500">{item.icon}</div>
                                        {item.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div >
        </div> */}
    </>);
};

export default Sidebar;