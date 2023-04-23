import { rootState } from "@/redux/reduxTypes"
import { useState } from "react"
import { useSelector } from "react-redux"
import { EllipsisTaskProps } from "./EllipsisTaskProps"

const ElipsisTask: React.FC<EllipsisTaskProps> = ({ closeElipsis, closeModal }) => {
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const [optionsOpen, setOpitonsOpen] = useState<boolean>(false)
  const [editTaskModalOpen, setEditTaskModalOpen] = useState<boolean>(false)
  
  const handleClickOptions = () => {
    setOpitonsOpen(!optionsOpen)
  }

  const handleDeleteTask = () => {
    closeModal()
    closeElipsis()
    setEditTaskModalOpen(!editTaskModalOpen)
  }

  return (
    <>
      <button onClick={handleClickOptions} className="bg-cover bg-center w-10 h-10 flex items-center justify-center" style={{background: `url('/assets/icon-vertical-ellipsis.svg') no-repeat right `}}></button>
      <>
        {
          optionsOpen ? (
            <div className={`h-24 px-4 w-48 flex items-start justify-center flex-col gap-2 rounded-lg absolute -right-5 top-14 ${theme === "light" ? "bg-_white" : "bg-almost_Dark" }`} style={{ boxShadow:  '0px 10px 20px rgba(54, 78, 126, 0.25)' }} >
              <button className={`text-_gray`}>Edit Task</button>
              <button className={`text-_red`} onClick={handleDeleteTask}>Delete Task</button>
            </div>
          ) : null 
        }
      </>
    </>
  )
}

export default ElipsisTask