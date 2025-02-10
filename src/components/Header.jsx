// here is the all assets
import logo from "../../public/logo.png"
import { IoCloseSharp, IoGridOutline, IoMenu } from 'react-icons/io5'
import { IoIosSearch } from 'react-icons/io'
import { MdOutlineDarkMode } from 'react-icons/md'
import { CiLight } from 'react-icons/ci'
import { useEffect, useRef, useState } from "react"


export const Header = ({ isGrid, isDark, togleSidebar, isSidebarOpen }) => {
    const [isSearch, setisSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const searchInput = useRef(null)

useEffect(()=>{
    if(isSearch){
        searchInput.current.focus()
        setSearchQuery("")
    }
},[isSearch])
    return (
        <header className='bg-gray-100 border-b border-gray-200 flex justify-between items-center px-2 md:px-6 py-1 h-[50px]'>
            <div className="flex gap-1 md:gap-4 items-center">
                <span onClick={togleSidebar} className="cursor-pointer">
                    {isSidebarOpen ? <IoCloseSharp className="size-3 md:size-7 hover:border-2 rounded-sm"/>
                    : 
                        <IoMenu className="size-3 md:size-7 hover:border-2 rounded-sm"/>}
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
                       onChange={(e)=>setSearchQuery(e.target.value)}
                       ref={searchInput}
                        type="text"
                        value={searchQuery}
                        placeholder="Search"
                        className="w-full py-[1px] md:py-1 pl-12 pr-2 md:pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                    />
                </div>

                <div className="flex gap-2 md:gap-5 items-center">
                        <IoIosSearch
                            onClick={() => setisSearch(!isSearch)}
                        className="size-3 md:size-6 hover:scale-125"
                        />
                    
                    {isGrid ? <FaListUl  
                    className="size-3 md:size-6 hover:scale-125"
                    /> 
                    : 
                    <IoGridOutline  
                    className="size-3 md:size-5 hover:scale-110"
                    />}
                    {isDark ? 
                    <CiLight  
                    className="size-3 md:size-6 hover:scale-125"
                    />
                    :
                     <MdOutlineDarkMode  
                     className="size-3 md:size-6 hover:scale-125"
                     />}
                </div>
            </div>
            
        </header>
    )
}
