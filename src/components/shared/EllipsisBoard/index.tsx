import { rootState } from "@/redux/reduxTypes";
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteModal from "../DeleteModal";
import EditBoard from "../EditBoard";

const Ellipsis = () => {
  const { nameBoard } = useSelector((rootReducer:rootState) => rootReducer.reducerNameBoard)
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const [optionsOpen, setOpitonsOpen] = useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [editBoardModalOpen, setEditBoardModalOpen] = useState<boolean>(false)

  const handleClickOptions = () => {
    setOpitonsOpen(!optionsOpen)
  }

  const handleClickDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen)
  }

  const handleClickEditModal = () => {
    setEditBoardModalOpen(!editBoardModalOpen)
  }

  return (
    <>
      <button onClick={handleClickOptions} className="bg-cover bg-center w-10 h-10 flex items-center justify-center" style={{background: `url('/assets/icon-vertical-ellipsis.svg') no-repeat center `}}></button>
      <>
        {
          optionsOpen ? (
            <div className={`h-24 w-48 flex items-start justify-center flex-col rounded-lg absolute right-1 top-20 ${theme === "light" ? "bg-_white" : "bg-almost_Dark" }`} style={{ boxShadow:  '0px 10px 20px rgba(54, 78, 126, 0.25)' }} >
              <button className={`text-#828FA3`} onClick={handleClickEditModal}>Edit Board</button>
              <button className={`text-_red`} onClick={handleClickDeleteModal}>Delete Board</button>
              {
                deleteModalOpen ? <DeleteModal closeModal={handleClickDeleteModal} NameToDelete={nameBoard} /> : null
              }
              {
                editBoardModalOpen ? <EditBoard closeModal={handleClickEditModal} /> : null 
              }
            </div>
          ) : null 
        }
      </>
    </>
  )
};

export default Ellipsis;