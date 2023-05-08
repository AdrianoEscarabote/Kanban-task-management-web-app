import { useSelector } from "react-redux"
import { rootState } from "@/redux/reduxTypes"
import InputToggle from "../shared/InputToggle"
import React from "react"
import ListBoardNames from "../shared/ListBoardNames"
import style from "./style.module.css"
import { MobileMenuProps } from "./MobileMenuProps"

const MobileMenu: React.FC<MobileMenuProps> = ({ handleModal }) => {
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)

  const handleModalOpen = () => {
    handleModal()
  }
  
  return (
    <div className={`${style.parent} parent_modal`} onClick={() => handleModalOpen()}>
      <div onClick={(e) => e.stopPropagation()} className={`${style.sidebar} fixed left-0 top-0 min-h-full w-80 flex flex-col ${theme === "light" ? "bg-_white border-r border-light_Blue" : "bg-dark_Gray border-r border-medium_Gray"}`} >
        <ListBoardNames closeModal={handleModal} />
        <div className={`${style.parent_buttons} w-full absolute bottom-5 flex flex-col gap-6 items-center justify-center`}>
          <InputToggle />
        </div>
      </div>  
    </div> 
  )
};

export default MobileMenu;