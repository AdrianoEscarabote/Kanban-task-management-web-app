import { useEffect, useState } from "react";
import { ViewTaskModalProps, sideTaskTypes } from "./ViewTaskModalProps"
import { useSelector } from "react-redux";
import { rootState } from "@/redux/reduxTypes";
import EllipsisTask from "../EllipsisTask"

const ViewTaskModal: React.FC<ViewTaskModalProps> = ({ closeModal, taskTarget, closeElipsis }) => {
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const boardNames = useSelector((rootReducer: rootState) => rootReducer.boardSlice)
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const [sideTasks, setSideTasks] = useState<sideTaskTypes[]>([])
  
  useEffect(() => {
    boardNames.boards.map(board => board.columns.map(col => col.tasks?.filter(task => task.title === taskTarget ? setSideTasks([...sideTasks, task]) : null)))
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        closeModal()
      }
    })
  })
    
  return (
    <div onClick={() => closeModal()} className={`fixed top-0 left-0 flex items-center justify-center z-50 h-screen w-full bg-modalParentBgLight`}>
  
      <section style={{ maxHeight: "429px" }} className={`max-w-md overflow-y-scroll w-full flex flex-col gap-4 p-8 rounded-md ${theme === "light" ? "bg-_white" : "bg-dark_Gray"}`} onClick={(e) => e.stopPropagation()}>

        {
          sideTasks.map((task, index) => (
            <div key={index}>
              <div className="flex items-center relative w-full overflow-visible justify-between">
                <h2 className={`font-bold text-lg ${theme === "light" ? "text-_dark" : "text-_white"}`}>{task.title}</h2>
                <EllipsisTask closeElipsis={closeElipsis} closeModal={closeModal} />
              </div>
              <p className={`font-medium text-sm text-_gray`}>{task.description}</p>
              <p className={`font-medium text-sm text-_gray`}>Subtask ({task.subtasks.length})</p>
              {
                task.subtasks.map((sub, index) => (
                  <label key={index} className={`flex items-center gap-4`} htmlFor={`radio-${index}`}>
                    <input 
                      type="checkbox" 
                      onChange={() => !sub.isCompleted} 
                      checked={sub.isCompleted} 
                      name={`radio-${index}`} 
                      id={`radio-${index}`} 
                    />
                    <span>{sub.title}</span>
                  </label>
                ))
              }
              <h3 className={`font-medium text-sm text-_gray`}>Current Status</h3>
              <label htmlFor="status">
                <select className={`px-4 py-2 h-10 font-medium text-sm/6 border-1 border rounded-lg ${theme === "light" ? "border-light_Blue text-_gray" : "border-medium_Gray text-_white"} w-full bg-transparent`} name="status" id="status">
                  {
                    boardNames.boards.filter(board => board.name === nameBoard).map(board => board.columns.map((col, index) => (
                      <option 
                      key={index}
                      className={`rounded-lg ${theme === "light" ? "text-_gray bg-_white" : "text-_white bg-almost_Dark"}`} 
                      value="Doing">
                        {col.name}
                      </option>
                    )))
                  }
                </select>
              </label>
            </div>
          ))
        }
      </section>
    </div>
  )
}

export default ViewTaskModal;