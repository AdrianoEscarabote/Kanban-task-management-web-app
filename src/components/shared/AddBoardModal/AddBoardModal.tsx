import { useEffect, useState } from "react"
import { AddBoardModalProps } from "./AddBoardModalProps"
import { useSelector } from "react-redux"
import { rootState } from "@/redux/reduxTypes"
import Image from "next/image"
import Button from "../Button/Button"

const AddBoardModal: React.FC<AddBoardModalProps> = ({ closeModal }) => {
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)

  useEffect(() => {
    window.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        closeModal()
      }
    })
  })

  const [subtasks, setSubtasks] = useState([{id: 1, value: "Todo"}, {id: 2, value: "Doing"}])

  const handleChangeInput = (id: number, value: string) => {
    const updatedSubtasks = subtasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          value: value,
        }
      }
      return task
    })
    setSubtasks(updatedSubtasks)
  }

  const handleAddSubtask = () => {
    const newId = subtasks.length + 1
    const newSubtask = { id: newId, value: ""}
    setSubtasks([...subtasks, newSubtask])
  }

  const handleRemoveSubtask = (id: number) => {
    const newSubtasks = subtasks.filter((task) => task.id !== id) 
    setSubtasks(newSubtasks)
  } 

  return (
    <div onClick={() => closeModal()} className={`fixed top-0 left-0 flex items-center justify-center z-50 h-screen w-full bg-modalParentBgLight`}>
      <section onClick={(e) => e.stopPropagation()} style={{height: "429px"}} className={`overflow-y-scroll font-bold text-lg/6 p-8 rounded-md w-full max-w-lg ${theme === "light" ? "bg-_white" : "bg-almost_Dark"}`}>
        <h2 className={`${theme === "light" ? "text-_dark" : "text-_white"}`}>Add new board</h2>
        <label htmlFor="name" className={`flex flex-col my-4 gap-2 font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>
          Name
          <input className={`px-4 py-2 rounded-md bg-transparent h-10 w-full border border-1 ${theme === "light" ? "border-light_Blue" : "border-medium_Gray"} `} type="text" name="name" id="name" placeholder="e.g. Web Design" />
        </label>

          <h3 className={`font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>Columns</h3>

          {
            subtasks.map((task) => (
              <label key={task.id} htmlFor={`subtasks${task.id}`} className={`my-4 gap-2 font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>
                <div className="flex items-center my-2">
                  <input value={task.value} onChange={(ev) => handleChangeInput(task.id, ev.currentTarget.value)} className={`px-4 py-2 rounded-md bg-transparent h-10 w-full border border-1 ${theme === "light" ? "border-light_Blue" : "border-medium_Gray"} `} type="text" id={`subtasks${task.id}`} />
                  <button type="button" className="w-10 grid place-content-center" onClick={() => handleRemoveSubtask(task.id)}>
                    <Image src="/assets/icon-cross.svg" width="15" height="15" alt="" />
                  </button>
                </div>
              </label>
            ))
          }

          <div className="mt-4 flex flex-col gap-4">
            <Button size="small" label="+ Add New Subtask" textColor="#635FC7" backgroundColor={`${theme === "light" ? "#635fc719" : "#FFF"}`} onClick={handleAddSubtask} />

            <Button size="small" label="Create New Board" backgroundColor="#635FC7" textColor="#FFF" />
          </div>

      </section>
    </div>
  ) 
}

export default AddBoardModal