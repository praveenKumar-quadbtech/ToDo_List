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
    const [isSideberOpen, setisSideberOpen] = useState(false)
    const [isOpen, setisOpen] = useState(true)
    const { isDark } = useSelector(state => state.themeAndLayout)

    const onClose = () => {
        setisOpen(!isOpen)
    }

    const togleSidebar = () => {
        setisSideberOpen(!isSideberOpen)
    }

    useEffect(() => {
        // Function to check screen size and update state
        const handleResize = () => {
            const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
            setisSideberOpen(isMediumScreen);
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
        // <div className={`dark:bg-[#242424] bg-[#FBFDFC] grid grid-rows-[auto_1fr_auto] h-screen relative grid-cols-[25%_75%] ${isSideberOpen ? "grid-areas-layout_sm md:grid-areas-layout_md" : "grid-areas-layout_sm"} px-11`}>
        //     <nav className="dark:bg-[#242424] sticky top-0 grid-in-navbar">
        //         <Header isSidebarOpen={isSideberOpen} togleSidebar={togleSidebar} />
        //     </nav>

        //     <aside className={`dark:bg-[#2C2C2C] ${isSideberOpen ? null : "hidden"} grid-in-sidebar bg-white dark:border-0 border-2  absolute top-[50px] w-[50%] md:w-full md:sticky h-[cals(100vh - 56px)] overflow-y-auto`} >
        //         <Sidebar isSidebarOpen={isSideberOpen} toggleSidebar={togleSidebar} />
        //     </aside>

        //     <main className="w-[1056px] grid-in-main overflow-y-auto relative">
        //         <RightSidebar isOpen={isOpen} onClose={onClose} />
        //         <AllRoute />
        //     </main>

        //     <footer className="grid-in-footer">
        //         <Footer />
        //     </footer>
        // </div>
        
        <div className="px-12 h-screen min-h-screen max-h-screen w-screen bg-[#FBFDFC] dark:bg-[#242424]">
           <nav className="h-14 py-3">
                <Header isSidebarOpen={isSideberOpen} togleSidebar={togleSidebar} />
           </nav>
            <div className="flex justify-between h-[calc(100vh-56px)]">
                <aside className={`w-[18.5%] ${isSideberOpen ? "" : "hidden"}`}>
                    <Sidebar isSidebarOpen={isSideberOpen} toggleSidebar={togleSidebar} />
                </aside>
                <main className={`${isSideberOpen ? "w-[78.5%]" : "w-full"} overflow-y-auto`}>
                    <RightSidebar isOpen={isOpen} onClose={onClose} />
                    <AllRoute />
                </main>
           </div>
        </div>
    );
};

export default Layout
