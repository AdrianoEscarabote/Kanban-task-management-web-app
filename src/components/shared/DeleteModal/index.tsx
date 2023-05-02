import { rootState } from "@/redux/reduxTypes"
import { useSelector } from "react-redux"
import { DeleteModalTypes } from "./DeleteModalTypes"
import { useEffect } from "react"
import Button from "../Button"
import { useDispatch } from "react-redux"
import { deleteBoard } from "@/redux/board/reducer"
import style from "./style.module.css"

const DeleteModal: React.FC<DeleteModalTypes> = ({ closeModal, NameToDelete }) => {
  const dispatch = useDispatch()
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)

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
  }

  return (
  <div onClick={() => closeModal()} className={`parent_modal fixed top-0 left-0 flex items-center justify-center p-4 z-50 h-screen w-full bg-modalParentBgLight`}>
  
    <section className={`${style.modal} max-w-lg flex flex-col gap-4 p-8 rounded-md ${theme === "light" ? "bg-_white" : "bg-dark_Gray"}`} onClick={(e) => e.stopPropagation()}>
      <h3 className="text-_red font-bold text-lg/6">Delete this {NameToDelete} ?</h3>
      <p className="text-_gray">Are you sure you want to delete the ‘{NameToDelete}’ board? This action will remove all columns and tasks and cannot be reversed.</p>

      <div className="flex items-center gap-5">
        <Button 
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
          size="small" 
          onClick={() => closeModal()} 
        />
      </div>
    </section>

  </div>
  )
}

export default DeleteModal