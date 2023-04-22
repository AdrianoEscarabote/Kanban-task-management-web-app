import { rootState } from "@/redux/reduxTypes"
import { useSelector } from "react-redux"
import { DeleteTaskModalProps } from "./DeleteTaskModalProps"
import { useEffect } from "react"
import Button from "../Button"
import { useDispatch } from "react-redux"
import { deleteTask } from "@/redux/board/reducer"
import style from "./style.module.css"

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ closeModal, NameToDelete }) => {

  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer) 

  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        closeModal()
      }
    })
  })

  const handleClickDeleteTask = () => {
    closeModal()
    dispatch(deleteTask({ name: NameToDelete }))
  }

  return (
    <>
      <div onClick={() => closeModal()} className={`fixed top-0 left-0 flex items-center justify-center z-50 h-screen w-full bg-modalParentBgLight`}>
  
        <section className={`max-w-lg flex flex-col gap-4 p-8 rounded-md ${theme === "light" ? "bg-_white" : "bg-dark_Gray"}`} onClick={(e) => e.stopPropagation()}>
          <h3 className="text-_red font-bold text-lg/6">Delete this task ?</h3>
          <p className={`text-_gray font-medium text-sm/6`}>Are you sure you want to delete the ‘{NameToDelete}’ task and its subtasks? This action cannot be reversed.</p>
          
          <div className="flex items-center gap-5">
            <Button 
              backgroundColor="#EA5555" 
              label="Delete" 
              hover={style.hover_destructive}
              size="small" 
              textColor="#FFF" 
              onClick={handleClickDeleteTask} 
            />
            <Button 
              backgroundColor={`${theme === "light" ? "#625fc71a" : "#FFF"}`} 
              textColor="#635FC7" 
              label="Cancel" 
              size="small" 
              hover={`${theme === "light" }`}
              onClick={() => closeModal()} 
            />
          </div>

        </section>

      </div>
    </>
  )
}

export default DeleteTaskModal