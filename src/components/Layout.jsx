import { useEffect, useState } from "react";
import "../App.css"
import { Header } from "./Header";
import Sidebar from "./Sidbar";
import Home from "../pagas/Home";
import { AllRoute } from "./AllRoute";
import { GiSmokingPipe } from "react-icons/gi";
import Footer from "./Footer";
import { RightSidebar } from "./RightSidebar";
import { useSelector } from "react-redux";

const Layout = () => {
    const [isLeftBar, setIsLeftBar] = useState(false)
    const { isDark } = useSelector(state => state.themeAndLayout)
    const { isRightBar, data } = useSelector(state => state.sidebar)

    // const onClose = () => {
    //     setisOpen(!isOpen)
    // }

    const togleSidebar = () => {
        setIsLeftBar(!isLeftBar)
    }

    useEffect(() => {
        // Function to check screen size and update state
        const handleResize = () => {
            const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
            setIsLeftBar(isMediumScreen);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);
    return (
        <div className={`container sm:h-svh mx-auto ${isRightBar ? "pl-12" : "px-12"} h-screen min-h-screen max-h-screen w-screen bg-[#FBFDFC] dark:bg-[#242424]`}>
           <nav className={`h-14 py-3 ${isRightBar ? "pr-12" : ""}`}>
                <Header isSidebarOpen={isLeftBar} togleSidebar={togleSidebar} />
           </nav>
            <div className="flex justify-between h-[calc(100vh-56px)]">
                <aside className={`transition-all duration-300 w-[18.5%] ${isLeftBar ? "" : "hidden"}`}>
                    <Sidebar isSidebarOpen={isLeftBar} toggleSidebar={togleSidebar} />
                </aside>

                <main
                    className={`${isLeftBar && isRightBar
                            ? "w-[52%]" 
                            : isRightBar
                                ? "w-[71%]" 
                                : isLeftBar
                                    ? "w-[78.5%]" 
                                    : "w-full" 
                        } overflow-y-auto scrollable-container pb-5`}
                >
                    <AllRoute />
                </main>

                <aside className={`transition-all duration-300 w-[28%] ${isRightBar ? "block" : "hidden"}`}>
                    <RightSidebar />
                </aside>
           </div>
        </div>
    );
};

export default Layout
