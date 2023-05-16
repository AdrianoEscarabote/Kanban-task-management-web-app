import { rootState } from "@/redux/reduxTypes"
import { useSelector } from "react-redux"
import { DeleteModalTypes } from "./DeleteModalTypes"
import { useEffect } from "react"
import Button from "../../components/shared/Button"
import { useDispatch } from "react-redux"
import { deleteBoard } from "../../redux/board/reducer"
import style from "./style.module.css"
import { setNameBoard } from "../../redux/nameBoard/actions"

const DeleteModal: React.FC<DeleteModalTypes> = ({ closeModal, NameToDelete }) => {
  const dispatch = useDispatch()
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const boardData = useSelector((rootReducer: rootState) => rootReducer.boardSlice)

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDeleteBoard = () => {
    dispatch(deleteBoard({ name: NameToDelete }))

    const nameFirstBoard = boardData.boards[0].name
    if (boardData.boards.length === 1) {
      dispatch(setNameBoard("Create a new board!"))
    } else if (nameFirstBoard === NameToDelete) {
      dispatch(setNameBoard(boardData.boards[1].name))
    } else {
      dispatch(setNameBoard(nameFirstBoard))
    }
  }

  return (
  <div onClick={() => closeModal()} className={`parent_modal fixed top-0 left-0 flex items-center justify-center p-4 z-50 h-screen w-full bg-modalParentBgLight`}>
    <section 
      className={`${style.modal} max-w-lg flex flex-col gap-4 p-8 rounded-md 
      ${theme === "light" 
      ? "bg-_white" 
      : "bg-dark_Gray"}`} 
      role="dialog" 
      aria-label="Delete Board" 
      aria-describedby="modal-content" 
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-_red font-bold text-lg/6">Delete this {NameToDelete} ?</h3>
      <p className="text-_gray">Are you sure you want to delete the ‘{NameToDelete}’ board? This action will remove all columns and tasks and cannot be reversed.</p>
      <div className="flex items-center gap-5">
        <Button 
          ariaLabel="Delete Board"
          backgroundColor="#EA5555" 
          label="Delete" 
          size="small" 
          textColor="#FFF" 
          onClick={() => {
            handleDeleteBoard()
            closeModal()
          }} 
        />
        <Button 
          backgroundColor="#FFF" 
          textColor="#635FC7" 
          label="Cancel" 
          ariaLabel="Cancel"
          size="small" 
          onClick={() => closeModal()} 
        />
      </div>
    </section>
  </div>
  )
}

export default DeleteModal