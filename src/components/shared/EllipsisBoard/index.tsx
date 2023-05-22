import { rootState } from "@/redux/reduxTypes";
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteModal from "../../../modals/DeleteBoard/index";
import EditBoard from "../../../modals/EditBoard";

const Ellipsis = () => {
  const boardData = useSelector((rootReducer: rootState) => rootReducer.boardSlice)
  const { nameBoard } = useSelector((rootReducer:rootState) => rootReducer.reducerNameBoard)
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const [optionsOpen, setOpitonsOpen] = useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [editBoardModalOpen, setEditBoardModalOpen] = useState<boolean>(false)
  const buttonDisabled = boardData.boards.length === 0

  const handleClickOptions = () => {
    if (buttonDisabled) {
      return null
    } else {
      setOpitonsOpen(!optionsOpen)
    }
  }

  const handleClickDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen)
    setOpitonsOpen(false)
  }

  const handleClickEditModal = () => {
    setEditBoardModalOpen(!editBoardModalOpen)
    setOpitonsOpen(false)
  }

  return (
    <>
      <button 
      aria-label={`
      ${optionsOpen 
      ? "close options" 
      : "open options"}`}
      onClick={handleClickOptions} 
      className={`
      ${buttonDisabled 
      ? "disabled" 
      : ""} bg-cover bg-center w-10 h-10 flex items-center justify-center`} 
      style={{background: `url('/assets/icon-vertical-ellipsis.svg') no-repeat center `}}
      data-testid="button-ellipsis-board"></button>
      <>
        {
          optionsOpen ? (
            <div 
              className={`h-24 w-48 pl-4 flex items-start justify-center flex-col gap-2 rounded-lg absolute right-3 top-20 
              ${theme === "light" 
              ? "bg-_white" 
              : "bg-almost_Dark" }`} 
              style={{ boxShadow:  '0px 10px 20px rgba(54, 78, 126, 0.25)' }} 
            >
              <button 
              aria-label="open edit board"
              className={`text-_gray`} 
              onClick={handleClickEditModal}
              data-testid="btn-edit-board">
                Edit Board
              </button>
              <button 
              aria-label="open delete modal"
              className={`text-_red`} 
              onClick={handleClickDeleteModal}
              data-testid="btn-delete-board">
                Delete Board
              </button>
            </div>
          ) : null 
        }
      </>
        {
          deleteModalOpen ? <DeleteModal closeModal={handleClickDeleteModal} NameToDelete={nameBoard} /> : null
        }
        {
          editBoardModalOpen ? <EditBoard closeModal={handleClickEditModal} /> : null 
        }
    </>
  )
};

export default Ellipsis;