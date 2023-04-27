import { rootState } from "@/redux/reduxTypes"
import { useSelector } from "react-redux"
import { EditTaskModalProps, Subtask } from "./EditTaskModalProps"
import { useEffect, useState } from "react"
import Button from "../Button"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { EditTask } from "@/redux/board/reducer"

const EditTaskModal: React.FC<EditTaskModalProps> = ({ closeModal, task }) => {
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const [title, setTitle] = useState<string>("");
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const [description, setDescription] = useState<string>("")
  const dispatch = useDispatch()

  const boardReducer = useSelector((rootReducer: rootState) => rootReducer.boardSlice)

  const [subtasks, setSubtasks] = useState<Subtask[]>([])

  const handleChangeInput = (id: number, value: string) => {
    const updatedSubtasks = subtasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          value: value
        }
      }
      return task
    })
    setSubtasks(updatedSubtasks)
  }

  const handleRemoveSubtask = (id: number) => {
    const newSubtasks = subtasks.filter((task) => task.id !== id) 
    setSubtasks(newSubtasks)
  } 

  const handleAddSubtask = () => {
    const newId = subtasks.length + 1
    const newSubtask = { id: newId, title: "", isCompleted: false }
    setSubtasks([...subtasks, newSubtask])
  }

  const handleEditTask = () => {
    /* subtasks.map(sub => sub.) */
    dispatch(EditTask({ 
      description: description,
      status: "",
      subtasks: subtasks,
      title: title
     }))
  }

  /* const [status, setStatus] = useState<string>(boardReducer.boards.filter(board => board.name === nameBoard)[0]?.columns[0]?.name ?? ""); */

  useEffect(() => {
    boardReducer.boards.map(board => 
      board.columns
      .map(col => col.tasks
      .map(tasks => {
        if (tasks.title === task) {

          setTitle(tasks.title)
          setDescription(tasks.description)
          tasks.subtasks.map(sub => {
            const newId = subtasks.length + 1
            const newSubtask = {  id: newId, isCompleted: false, title: sub.title }
            setSubtasks([...subtasks, newSubtask])
          })

        }


        return tasks

      })

    ))
  }, [])

  return (
    <div onClick={() => closeModal()} className={`fixed top-0 left-0 flex items-center justify-center z-50 h-screen w-full bg-modalParentBgLight`}>

      <section onClick={(e) => e.stopPropagation()} style={{height: "675px"}} className={`overflow-y-scroll font-bold text-lg/6 p-8 rounded-md w-full max-w-lg ${theme === "light" ? "bg-_white" : "bg-almost_Dark"}`}>
        <div className="flex items-center relative w-full overflow-visible justify-between">
          <h2 className={`font-bold text-lg ${theme === "light" ? "text-_dark" : "text-_white"}`}>Edit Task</h2>
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

              {
                subtasks.map((task) => (
                  <label key={task.id} htmlFor={`subtasks${task.id}`} className={`flex gap-2 font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>

                    <input value={task.title} onChange={(ev) => handleChangeInput(task.id, ev.currentTarget.value)} className={`px-4 py-2 rounded-md bg-transparent h-10 max-w-sm w-full border border-1 ${theme === "light" ? "border-light_Blue" : "border-medium_Gray"} `} type="text" name="subtask" id={`subtasks${task.id}`} placeholder="e.g. Make coffee" />

                    <button type="button" className="w-10 grid place-content-center" onClick={() => handleRemoveSubtask(task.id)}>
                      <Image src="/assets/icon-cross.svg" width="15" height="15" alt="" />
                    </button>
                  </label>
                ))
              }
            </div>
            <Button 
              size="small" 
              label="+ Add New Subtask" 
              textColor="#635FC7" 
              backgroundColor={`${theme === "light" ? "#635fc719" : "#FFF"}`} 
              onClick={handleAddSubtask}
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
              onClick={handleEditTask}
            />
          </fieldset>
        </form>
      </section>
    </div>
  )
}

export default EditTaskModal