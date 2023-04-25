import React, { useState } from "react";
import { HeaderProps } from "./HeaderProps";
import { rootState } from "@/redux/reduxTypes";
import Image from "next/image";
import { useSelector } from "react-redux";
import Sidebar from "../SideBar";
import Ellipsis from "../shared/EllipsisBoard";
import AddTaskModal from "../AddTaskModal";
 
const Header: React.FC<HeaderProps> = ({ open }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const boardNames = useSelector((rootReducer: rootState) => rootReducer.boardSlice)

  const handleClickOpenModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <header className={`w-full z-20 border-b fixed flex ${theme === "light" ? "bg-_white border-light_Blue" : "bg-dark_Gray border-medium_Gray"}`}>
      <nav aria-label="main" className="w-full flex items-center justify-between">
        <Sidebar />
        <Image 
          style={{ width: "auto" }} 
          className="my-5 mx-5" 
          src={theme === "light" ? "/assets/logo-dark.svg" : "/assets/logo-light.svg"} height="25" 
          width="152" 
          alt="Kanban - Home" 
          priority={true} 
        />

        <div className={`py-5 relative px-5 border-l content flex items-center justify-between w-full ${theme === "light" ? "border-light_Blue" : "border-medium_Gray"}`}>

          <h2 className={`text-2xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}>{!nameBoard ? boardNames.boards[0]?.name : nameBoard }</h2>

          <div className="wrapper_buttons flex items-center justify-center">
            <button onClick={handleClickOpenModal} className={`bg-purple_Dark text-_white w-40 h-12 rounded-3xl mr-5 text-sm font-bold hover:bg-purple_Light`}>+ Add new Task</button>

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