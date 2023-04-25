import { rootState } from "@/redux/reduxTypes"
import { useSelector } from "react-redux"
import { EditTaskModalProps } from "./EditTaskModalProps"
import { useState } from "react"
import Button from "../Button"

const EditTaskModal: React.FC<EditTaskModalProps> = ({ closeModal, task }) => {
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("")

  return (
    <div onClick={() => closeModal()} className={`fixed top-0 left-0 flex items-center justify-center z-50 h-screen w-full bg-modalParentBgLight`}>
      <section onClick={(e) => e.stopPropagation()} style={{height: "675px"}} className={`overflow-y-scroll font-bold text-lg/6 p-8 rounded-md w-full max-w-lg ${theme === "light" ? "bg-_white" : "bg-almost_Dark"}`}>
        <div className="flex items-center relative w-full overflow-visible justify-between">
          <h2 className={`font-bold text-lg ${theme === "light" ? "text-_dark" : "text-_white"}`}>{task}</h2>
        </div>
        <form noValidate={true}>
          <fieldset className="border-none flex flex-col gap-4 mt-5">

            <legend className="sr-only">put your task information</legend>

            <label htmlFor="title" className={`flex flex-col gap-2 font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>
              Title

              <input 
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                className={`px-4 py-2 rounded-md bg-transparent h-10 w-full border border-1 ${theme === "light" ? "border-light_Blue" : "border-medium_Gray"} `} 
                type="text" 
                id="title" 
                name="title" 
                placeholder="e.g. Take coffee break" 
              />

            </label>

            <label htmlFor="description" className={`flex flex-col gap-2 font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>
              Description

              <textarea 
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                className={`px-4 py-2 rounded-md bg-transparent h-28 w-full border border-1 ${theme === "light" ? "border-light_Blue" : "border-medium_Gray"} `} 
                name="description" id="description" 
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.">
              </textarea>

            </label>
            <h3 className={`font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>Subtasks</h3>
            <div className="subtask flex flex-col gap-4">

              {/* {
                subtasks.map((task) => (
                  <label key={task.id} htmlFor={`subtasks${task.id}`} className={`flex gap-2 font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>

                    <input value={task.value} onChange={(ev) => handleChangeInput(task.id, ev.currentTarget.value)} className={`px-4 py-2 rounded-md bg-transparent h-10 max-w-sm w-full border border-1 ${theme === "light" ? "border-light_Blue" : "border-medium_Gray"} `} type="text" name="subtask" id={`subtasks${task.id}`} placeholder="e.g. Make coffee" />

                    <button type="button" className="w-10 grid place-content-center" onClick={() => handleRemoveSubtask(task.id)}>
                      <Image src="/assets/icon-cross.svg" width="15" height="15" alt="" />
                    </button>
                  </label>
                ))
              } */}
            </div>
            <Button 
              size="small" 
              label="+ Add New Subtask" 
              textColor="#635FC7" 
              backgroundColor={`${theme === "light" ? "#635fc719" : "#FFF"}`} 
              
            />
            <h3 className={`font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>Status</h3>
            <label htmlFor="status">
              <select 
                /* value={status}  */
                /* onChange={(e) => setStatus(e.currentTarget.value)}  */
                className={`px-4 py-2 h-10 font-medium text-sm/6 border-1 border rounded-lg ${theme === "light" ? "border-light_Blue text-_gray" : "border-medium_Gray text-_white"} w-full bg-transparent`} 
                name="status" 
                id="status"
              >
                {/* {boardSlice.boards.map((board) => {
                  if (board.name !== nameBoard) {
                    return null;
                  }

                  return board.columns.map((col, index) => (
                    <option
                      key={index}
                      value={col.name}
                      className={`rounded-lg ${
                        theme === "light" ? "text-gray-700 bg-white" : "text-white bg-gray-700"
                      }`}
                    >
                      {col.name}
                    </option>
                  ));
                })} */}
              </select>
            </label>
            <Button 
              size="small" 
              label="Create Task" 
              backgroundColor="#635FC7" 
              textColor="#FFF" 
            />
          </fieldset>
        </form>
      </section>
    </div>
  )
}

export default EditTaskModal