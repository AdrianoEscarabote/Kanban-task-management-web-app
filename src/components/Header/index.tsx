import React, { useState } from "react";
import { rootState } from "@/redux/reduxTypes";
import Image from "next/image";
import { useSelector } from "react-redux";
import Sidebar from "../SidebarDesktop";
import Ellipsis from "../shared/EllipsisBoard";
import AddTaskModal from "../../modals/AddTaskModal";
import style from "./style.module.css"
import MobileMenu from "../MobileMenu"; 
 
const Header = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const boardData = useSelector((rootReducer: rootState) => rootReducer.boardSlice)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  const buttonDisabled = boardData.boards.length === 0
  
  const handleClickOpenModal = () => {
    if (buttonDisabled) {
      return null
    } else {
      setModalOpen(!modalOpen)
    }
  }

  const handleOpenMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className={`${style.header} w-full z-20 border-b fixed flex ${theme === "light" ? "bg-_white border-light_Blue" : "bg-dark_Gray border-medium_Gray"}`}>
      <nav aria-label="main" className="w-full flex items-center justify-between">

        <Sidebar />

        {
          mobileMenuOpen ? <MobileMenu handleModal={handleOpenMobileMenu} /> : null
        }

        <picture className="my-5 mx-5 h-auto">
          <source media="(max-width:620px)" srcSet={"/assets/logo-mobile.svg"} width="24" height="25" />
          <Image 
            style={{ height: "auto", width: "auto" }}  
            src={theme === "light" ? "/assets/logo-dark.svg" : "/assets/logo-light.svg"} 
            height="25" 
            width="160" 
            alt="Kanban - Home" 
            priority={true} 
          />
        </picture>

        <div className={`${style.parent_items} py-5 relative px-5 border-l content flex items-center justify-between w-full ${theme === "light" ? "border-light_Blue" : "border-medium_Gray"}`}>

          <h2 className={`${style.h2} text-2xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}>{!nameBoard ? boardData.boards[0]?.name : nameBoard }</h2>

          <button 
            aria-label={`${mobileMenuOpen ? "close Sidebar" : "open Sidebar"}`}
            onClick={handleOpenMobileMenu}
            className={`${style.button_sidebar} text-2xl font-bold items-center gap-2
            ${theme === "light" 
            ? "text-black" 
            : "text-white"}`
            } 
            data-testid="mobile-menu-button"
            >
              <span className={style.text_button}>{!nameBoard ? boardData.boards[0]?.name : nameBoard }</span>
              <Image 
                className="mt-1"
                src={mobileMenuOpen ? "/assets/icon-chevron-up.svg" : "/assets/icon-chevron-down.svg"} 
                width={8}
                height={5.59}
                alt=""
              />
            </button>

          <div className="wrapper_buttons flex items-center justify-center">
            <button onClick={handleClickOpenModal} className={`${style.buttonDesktop} 
            ${buttonDisabled 
            ? "disabled" 
            : ""} bg-purple_Dark text-_white w-40 h-12 rounded-3xl mr-5 text-sm font-bold hover:bg-purple_Light`}>+ Add new Task</button>
            
            <button 
            aria-label={modalOpen 
              ? "close add task modal" 
              : "open add task modal"}
            onClick={handleClickOpenModal}
            className={`${style.buttonMobile}
            ${buttonDisabled 
            ? "disabled" 
            : ""} flex place-content-center bg-purple_Dark text-_white w-12 h-8 rounded-3xl mr-2 pb-1 text-sm font-bold hover:bg-purple_Light`}>+</button>

            <Ellipsis />

          </div>
          {
            modalOpen ? <AddTaskModal closeModal={handleClickOpenModal} /> : null
          }
        </div>
      </nav>
    </header>
  );
};

export default Header;