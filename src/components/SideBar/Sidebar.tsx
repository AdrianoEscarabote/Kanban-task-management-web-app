import { useSelector } from "react-redux"
import { rootState } from "@/redux/reduxTypes"
import InputToggle from "../InputToggle/InputToggle"
import Image from "next/image"
import { useEffect, useState } from "react"
import ListBoardNames from "../shared/ListBoardNames/ListBoardNames"

const Sidebar = () => {

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)

  const handleClickOpenSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  };

  useEffect(() => {
    sidebarOpen ?
      document.querySelector(".content")?.classList.add("sidebarOpen")
    : 
    document.querySelector(".content")?.classList.remove("sidebarOpen") 
    
    sidebarOpen ? 
    document.querySelector("main")?.classList.add("mainSidebarOpen")
    :
    document.querySelector("main")?.classList.remove("mainSidebarOpen")
  })
  
  return (
    <>
      {
        sidebarOpen ? (
          <div className={`fixed left-0 top-0 min-h-full w-80 flex flex-col ${theme === "light" ? "bg-_white border-r border-light_Blue" : "bg-dark_Gray border-r border-medium_Gray"}`} >
            <Image className="my-8 mx-5" src={theme === "light" ? "/assets/logo-dark.svg" : "/assets/logo-light.svg"} height="25" width="152" alt="Kanban - Home" />

            <ListBoardNames />

            <div className="w-full absolute bottom-5 flex flex-col gap-6 items-center justify-center">
              
              <InputToggle />

              <button onClick={handleClickOpenSidebar} className={`h-12 pl-16 mr-16 rounded-br-3xl rounded-se-3xl w-full flex items-center justify-start text-_gray gap-3 ${theme === "light" ? "hover:bg-purple_Dark hover:text-_white" : "hover:bg-_white hover:text-purple_Dark"} `}>

                <Image src="/assets/icon-hide-sidebar.svg" width="18" height="16" alt="" />

                <span className="font-bold text-sm/5">Hide Sidebar</span>
              </button>
            </div>
          </div>  
        ) : (
          <button style={{ bottom: "-84vh" }} onClick={handleClickOpenSidebar} className="bg-_White w-28 h-12 rounded-3xl absolute -left-14 bg-purple_Dark flex items-center justify-center">
            <Image className="ml-14 h-auto w-6" src="/assets/icon-show-sidebar.svg" width="26" height="20" alt="" />            
          </button>
        )
      }
    </>
  )
};

export default Sidebar;