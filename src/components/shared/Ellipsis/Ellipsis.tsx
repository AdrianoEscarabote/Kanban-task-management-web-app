import { rootState } from "@/redux/reduxTypes";
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteModal from "../DeleteModal/DeleteModal";

const Ellipsis = () => {
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const [optionsOpen, setOpitonsOpen] = useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)

  const handleClickOptions = () => {
    setOpitonsOpen(!optionsOpen)
  }

  const handleClickModal = () => {
    setDeleteModalOpen(!deleteModalOpen)
  }

  return (
    <>
      <button onClick={handleClickOptions} className="bg-cover bg-center w-10 h-10 flex items-center justify-center" style={{background: `url('/assets/icon-vertical-ellipsis.svg') no-repeat center `}}></button>
      <>
        {
          optionsOpen ? (
            <div className={`h-24 w-48 flex items-start justify-center flex-col rounded-lg absolute right-1 top-20 ${theme === "light" ? "bg-_white" : "bg-almost_Dark" }`} style={{ boxShadow:  '0px 10px 20px rgba(54, 78, 126, 0.25)' }} >
              <button className={`text-#828FA3`}>Edit Board</button>
              <button className={`text-_red`} onClick={handleClickModal}>Delete Board</button>
              {
                deleteModalOpen ? <DeleteModal closeModal={handleClickModal} itemDelete="Board" name="Platform Laucnh" /> : null
              }
            </div>
          ) : null 
        }
      </>
    </>
  )
};

export default Ellipsis;