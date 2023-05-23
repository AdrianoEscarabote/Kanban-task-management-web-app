import { useSelector } from "react-redux"
import { rootState } from "@/redux/reduxTypes"
import InputToggle from "../shared/InputToggle"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import ListBoardNames from "../shared/ListBoardNames"
import style from "./style.module.css"

const SidebarDesktop = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
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
          <div className={style.parent} onClick={() => handleClickOpenSidebar()}>
            <div 
            onClick={(e) => e.stopPropagation()} 
            className={`${style.sidebar} fixed left-0 top-0 min-h-full flex flex-col 
            ${theme === "light" 
            ? "bg-_white border-r border-light_Blue" 
            : "bg-dark_Gray border-r border-medium_Gray"}`} >
              <Image 
                className={`${style.logo} my-8 ml-8`} 
                src={theme === "light" 
                ? "/assets/logo-dark.svg" 
                : "/assets/logo-light.svg"} 
                height="25" 
                width="152" 
                alt="Kanban - Home" 
              />

              <ListBoardNames />

              <div className={`${style.parent_buttons} w-full absolute bottom-8 flex flex-col gap-2 items-center justify-center`}>
                
                <InputToggle />

                <button 
                  aria-label="hide sidebar"
                  onClick={handleClickOpenSidebar} 
                  className={`h-12 pl-16 mr-16 rounded-br-3xl rounded-se-3xl w-full flex items-center justify-start text-_gray gap-3 
                  ${theme === "light" 
                  ? "hover:bg-purple_Dark hover:text-_white" 
                  : "hover:bg-_white hover:text-purple_Dark"} `}
                  data-testid="btn-hide-sidebar"
                >
                  <Image src="/assets/icon-hide-sidebar.svg" width="18" height="16" alt="" />

                  <span className="font-bold text-sm/5">Hide Sidebar</span>
                </button>
              </div>
              </div>  
          </div>
        ) : (
          <button 
          aria-label="show sidebar"
          style={{ bottom: "-84vh" }} 
          onClick={handleClickOpenSidebar} 
          className={`${style.eye_button} bg-_White w-28 h-12 rounded-3xl absolute -left-14 bg-purple_Dark flex items-center justify-center`}
          data-testid="btn-show-sidebar">
            <Image className="ml-14 h-auto w-6" src="/assets/icon-show-sidebar.svg" width="26" height="20" alt="" />            
          </button>
        )
      }
    </>
  )
};

export default SidebarDesktop;