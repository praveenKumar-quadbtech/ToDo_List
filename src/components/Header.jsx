// here is the all assets
import logo from "../../public/logo.png"
import { IoCloseSharp, IoGridOutline, IoMenu } from 'react-icons/io5'
import { IoIosSearch } from 'react-icons/io'
import { MdOutlineDarkMode } from 'react-icons/md'
import { CiLight } from 'react-icons/ci'
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleLayout } from "../redux/slices/themeAndLayoutSlice"
import { FaListUl } from "react-icons/fa"
import UserProfileIcon from "./UserProfileIcon"
import { logout } from "../redux/slices/authSlice"
import { Link } from "react-router"


export const Header = ({ togleSidebar, isSidebarOpen, toggleTheme, isDark }) => {
    const [isSearch, setisSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const searchInput = useRef(null)
    const { isGrid } = useSelector(state => state.themeAndLayout)
    const dispatch = useDispatch()
    const [isActive, setisActive] = useState(false)
    const { user } = useSelector(state => state?.auth)

    const [grid, setGrid] = useState(false)

    const handelLogout = () => {
        dispatch(logout())
        setisActive(false)
    }


    const toggleGrid = () => {
        setGrid(!grid)
    }
    useEffect(() => {
        if (grid) {
            document.documentElement.classList.add("grid-cont");
        } else {
            document.documentElement.classList.remove("grid-cont");
        }
    }, [grid]);


    useEffect(() => {
        if (isSearch) {
            searchInput.current.focus()
            setSearchQuery("")
        }
    }, [isSearch])

    return (
        <header className=' dark:text-white flex justify-between items-center w-full'>
            <div className="flex gap-1 md:gap-4 items-center">
                <span onClick={togleSidebar} className="cursor-pointer">
                    {isSidebarOpen ? <IoCloseSharp className="size-5 md:size-7 hover:border-2 rounded-sm" />
                        :
                        <IoMenu className="size-5 md:size-7 hover:border-2 rounded-sm" />}
                </span>
                <span className='w-[50%] md:w-[70%]'>
                    <img className='w-full h-1/2' src={logo} alt="logo" />
                </span>
            </div>

            <div className="w-[90%] md:w-[50%] flex gap-3 justify-end">
                <div className={`${isSearch ? null : "hidden"} relative w-[80%]`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-4 h-4 md:w-6 md:h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        ref={searchInput}
                        type="text"
                        value={searchQuery}
                        placeholder="Search"
                        className="w-full py-[1px] md:py-1 pl-12 pr-2 md:pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                    />
                </div>

                <div className="flex gap-3 md:gap-5 items-center">
                    <IoIosSearch
                        onClick={() => setisSearch(!isSearch)}
                        className="size-4 md:size-6 hover:scale-125 cursor-pointer"
                    />

                    <button onClick={() => {
                        dispatch(toggleLayout())
                        toggleGrid()
                    }}>
                        {isGrid ? <FaListUl
                            className="size-3 md:size-5 hover:scale-125 cursor-pointer"
                        />
                            :
                            <IoGridOutline
                                className="size-3 md:size-5 hover:scale-110 cursor-pointer"
                            />}
                    </button>

                    <button onClick={toggleTheme}>
                        {isDark ?
                            <CiLight
                                className="size-5 md:size-6 hover:scale-125 cursor-pointer"
                            />
                            :
                            <MdOutlineDarkMode
                                className="size-5 md:size-6 hover:scale-125 cursor-pointer"
                            />}
                    </button>

                    <div className="flex md:hidden justify-center items-center p-2">
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
                    <div className={`${isActive ? "md:hidden flex" : "hidden"} flex-col justify-center items-center z-10 shadow-sm rounded-md dark:shadow-white absolute right-0 top-12 bg-[#FBFDFC] dark:bg-[#232323] shadow-black`}>
                        <button onClick={() => setisActive(false)} className="py-2 px-5 shadow-sm border-b-[1px] dark:border-green-100 hover:text-green-400">My Profile</button>
                        <button onClick={()=>{
                            handelLogout()
                            setisActive(false)
                        }} className="py-2 px-3 shadow-sm hover:text-green-400">Logout</button>
                    </div>

                </div>


            </div>

        </header>
    )
}
