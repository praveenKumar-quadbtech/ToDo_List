import { useEffect, useState } from "react";
import "../App.css"
import { Header } from "./Header";
import Sidebar from "./Sidbar";
import { AllRoute } from "./AllRoute";

const Layout = () => {
    const [isLeftBar, setIsLeftBar] = useState(false)
    const [isDark, setIsDark] = useState(() => {
        return JSON.parse(localStorage.getItem("isDark")) ?? false;
    });
    const [isRightBar, setIsRightBar] = useState(false)

    const toggleTheme = () => {
        const newTheme = !isDark
        setIsDark(newTheme)
        localStorage.setItem("isDark", JSON.stringify(newTheme));
    }

    const toggleRightBar = (status) => {
        setIsRightBar(status)
    }

    const togleSidebar = () => {
        setIsLeftBar(!isLeftBar)
    }

    useEffect(() => {
        const handleResize = () => {
            const isMediumScreen = window.matchMedia('(min-width: 768px)').matches;
            setIsLeftBar(prev => (prev !== isMediumScreen ? isMediumScreen : prev));
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isDark !== (document.documentElement.classList.contains("dark"))) {
            if (isDark) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }, [isDark]);


    return (
        <div className={`w-full h-auto bg-[#f2f2f2] dark:bg-[#242424] transition-all`} >
            <nav className="fixed top-0 border-b-2 dark:border-[#232323] dark:border-2 dark:sm:shadow-md left-0 right-0 px-6 md:px-0 md:left-12 md:right-12 h-14 bg-[#f2f2f2] dark:bg-[#242424] flex items-center z-50">
                <Header isDark={isDark} isSidebarOpen={isLeftBar} togleSidebar={togleSidebar} toggleTheme={toggleTheme} />
            </nav>

            <div className={`w-full ${isRightBar ? "pl-6 md:pl-12" : "px-6 md:px-12"} flex justify-between mt-16 md:relative`}>
                <aside className={`transition-all duration-300 w-[18.5%] ${isLeftBar ? "hidden md:block" : "hidden"}`}>
                    <Sidebar isSidebarOpen={isLeftBar} toggleSidebar={togleSidebar} />
                </aside>
                <aside className={`absolute transition-all duration-300 left-0 top-0 w-[60%] ${isLeftBar ? "md:hidden block" : "hidden"}`}>
                    <Sidebar isSidebarOpen={isLeftBar} toggleSidebar={togleSidebar} />
                </aside>

                <main
                    className={`${isLeftBar
                        ? "md:w-[78.5%] w-full"
                        : "w-full"
                        }  pb-5`}
                >
                    <AllRoute toggleRightBar={toggleRightBar} isRightBar={isRightBar} isLeftBar={isLeftBar} />
                </main>
            </div>
        </div>
    );
};

export default Layout
