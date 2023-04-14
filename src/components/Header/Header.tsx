import React, { useEffect, useState } from "react";
import { HeaderProps, rootState } from "./HeaderProps";
import Image from "next/image";
import { useSelector } from "react-redux";
import Sidebar from "../SideBar/Sidebar";
import Ellipsis from "../shared/Ellipsis/Ellipsis";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
 
const Header: React.FC<HeaderProps> = ({ open }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)

  const handleClickOpenModal = () => {
    setModalOpen(!modalOpen)
  }


  return (
    <header className={`w-full border-b flex ${theme === "light" ? "bg-_white border-light_Blue" : "bg-dark_Gray border-medium_Gray"}`}>

      <nav aria-label="main" className="w-full flex items-center justify-between">
        <Sidebar />

        <Image className="my-5 mx-5" src={theme === "light" ? "/assets/logo-dark.svg" : "/assets/logo-light.svg"} height="25" width="152" alt="Kanban - Home" />

        <div className={`py-5 relative px-5 border-l content flex items-center justify-between w-full ${theme === "light" ? "border-light_Blue" : "border-medium_Gray"}`}>

          <h2 className={`text-2xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}>Platform Launch</h2>

          <div className="wrapper_buttons flex items-center justify-center">
            <button onClick={handleClickOpenModal} className={`bg-purple_Dark text-_white w-40 h-12 rounded-3xl mr-5 text-sm font-bold`}>+ Add new Task</button>

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