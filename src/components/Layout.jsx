import { useEffect, useState } from "react";
import "../App.css"
import { Header } from "./Header";
import Sidebar from "./Sidbar";
import Home from "../pagas/Home";
import { AllRoute } from "./AllRoute";
import { GiSmokingPipe } from "react-icons/gi";
import Footer from "./Footer";
import { RightSidebar } from "./RightSidebar";

const Layout = () => {
    const [isGrid, setisGrid] = useState(false)
    const [isDark, setisDark] = useState(false)
    const [isSideberOpen, setisSideberOpen] = useState(false)
    const [isOpen, setisOpen] = useState(true)

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
    return (
        <div className={`grid grid-rows-[auto_1fr_auto] h-screen relative grid-cols-[25%_75%] ${isSideberOpen ? "grid-areas-layout_sm md:grid-areas-layout_md" : "grid-areas-layout_sm"} `}>
            <nav className="sticky top-0 grid-in-navbar">
                <Header isSidebarOpen={isSideberOpen}  isDark={isDark} isGrid={isGrid} togleSidebar={togleSidebar} />
            </nav>
            <aside className={`${isSideberOpen ? null : "hidden"} grid-in-sidebar border-2  absolute top-[50px] w-[50%] md:w-full md:sticky h-[cals(100vh - 56px)] overflow-y-auto`} >
                <Sidebar isSidebarOpen={isSideberOpen} toggleSidebar={togleSidebar} />
            </aside>
            <main className="w-full h-200 grid-in-main overflow-y-auto relative">
                <RightSidebar isOpen={isOpen} onClose={onClose}/>
                <AllRoute />
            </main>
            <footer className="grid-in-footer">
                <Footer/>
            </footer>
        </div>
    );
};

export default Layout
