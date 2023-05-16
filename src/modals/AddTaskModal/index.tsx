import { useSelector } from "react-redux"
import { rootState } from "@/redux/reduxTypes"
import { AddTaskModalTypes, formData } from "./AddTask"
import React, { useEffect, useState } from "react"
import Button from "../../components/shared/Button"
import Image from "next/image"
import { addNewTask } from "../../redux/board/reducer"
import { useDispatch } from "react-redux"
import { createNewTask } from "@/redux/board/boardTypes"
import style from "./style.module.css"
import { useForm } from "react-hook-form"

const AddTaskModal: React.FC<AddTaskModalTypes> = ({ closeModal }) => {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)  
  const boardData = useSelector((rootReducer: rootState) => rootReducer.boardSlice)
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  const [subtasks, setSubtasks] = useState([{id: 1, value: ""}, {id: 2, value: ""}])

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

  const handleAddSubtask = () => {
    const newId = subtasks.length + 1
    const newSubtask = { id: newId, value: ""}
    setSubtasks([...subtasks, newSubtask])
  }

  const handleRemoveSubtask = (id: number) => {
    const newSubtasks = subtasks.filter((task) => task.id !== id) 
    setSubtasks(newSubtasks)
  } 

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<formData>()

  const onSubmit =  handleSubmit(() => {
    const obj: createNewTask = {
      nameColumn: nameBoard,
      Task: {
        title: title,
        description: description,
        status: status,
        subtasks: subtasks.map(sub => { return { title: sub.value, isCompleted: false }}) 
      }
    }
    dispatch(addNewTask(obj))  
    closeModal()
  })

  return (
    <div onClick={() => closeModal()} className={`parent_modal overflow-y-scroll fixed top-0 left-0 flex items-center p-4 justify-center z-50 h-screen w-full bg-modalParentBgLight`}>

      <section 
        role="dialog" 
        aria-label="Add Task" 
        aria-describedby="modal-content"  
        onClick={(e) => e.stopPropagation()} 
        className={`${style.modal} overflow-y-scroll font-bold text-lg/6 p-8 rounded-md w-full max-w-lg 
        ${theme === "light" 
        ? "bg-_white" 
        : "bg-almost_Dark"}`}
        >
        <h2 className={`${theme === "light" ? "text-_dark" : "text-_white"}`}>Add New Task</h2>
        <form onSubmit={onSubmit}>
          <fieldset className="border-none flex flex-col gap-4 mt-5">
            <legend className="sr-only">Put your task information</legend>
            <label
              aria-label="enter task name"
              htmlFor="title" 
              className={`relative flex flex-col gap-2 font-bold text-xs 
              ${theme === "light" 
              ? "text-_gray" 
              : "text-_white"}`}
            >
              Title
              <input 
                {...register("title", { required: true })}
                value={title}
                onChange={(e) => {
                  setValue("title", e.currentTarget.value)
                  setTitle(e.currentTarget.value)
                }}
                className={`
                  ${errors.title 
                  ? "error_input" 
                  : ""} 
                  px-4 py-2 rounded-md bg-transparent h-10 w-full border border-1 
                  ${theme === "light" 
                  ? "border-light_Blue text-_dark" 
                  : "border-medium_Gray text-_white"} 
                `} 
                type="text" 
                id="title" 
                name="title" 
                placeholder="e.g. Take coffee break" 
              />
              <span className="absolute text-_red right-3 top-9">
                {errors.title && "Can’t be empty"}
              </span>
            </label>

            <label aria-label="enter task description" htmlFor="description" className={`flex flex-col gap-2 font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>
              Description
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                className={`px-4 py-2 rounded-md bg-transparent h-28 w-full border border-1 
                ${theme === "light" 
                ? "border-light_Blue text-_dark" 
                : "border-medium_Gray text-_white"} `} 
                name="description" id="description" 
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.">
              </textarea>
            </label>
            <h3 className={`font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>Subtasks</h3>
            <div className="subtask flex flex-col gap-4">
              {
                subtasks.map((task, index) => (
                  <label 
                    aria-label="Put the title of your subtask"
                    key={task.id} 
                    htmlFor={`subtasks${task.id}`} 
                    className={`flex gap-2 font-bold text-xs 
                    ${theme === "light" 
                    ? "text-_gray" 
                    : "text-_white"}`}
                  >
                    <input
                      {...register(`subtasks.${index}.value`, { required: true })}
                      value={task.value}
                      onChange={(e) => {
                        setValue(`subtasks.${index}.value`, e.target.value)
                        handleChangeInput(task.id, e.currentTarget.value)
                      }}
                      type="text"
                      name="subtask"
                      id={`subtasks${task.id}`} 
                      placeholder="e.g. Make coffee" 
                      className={`px-4 py-2 rounded-md bg-transparent h-10 max-w-sm w-full border border-1 
                      ${theme === "light" 
                      ? "border-light_Blue text-_dark" 
                      : "border-medium_Gray text-_white"} 
                      `} 
                    />
                    <button 
                    aria-label="remove input"
                    type="button" 
                    className={`${style.button_remove_input} w-10 grid place-content-center`} onClick={() => handleRemoveSubtask(task.id)}
                    >
                      <Image src="/assets/icon-cross.svg" width="15" height="15" alt="" />
                    </button>
                  </label>
                ))
              }
            </div>
            <Button 
              ariaLabel="Add new input"
              size="small" 
              label="+ Add New Subtask" 
              textColor="#635FC7" 
              backgroundColor={`
              ${theme === "light" 
              ? "#635fc719" 
              : "#FFF"}`} 
              onClick={handleAddSubtask} 
            />
            <h3 className={`font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>Status</h3>
            <label htmlFor="status" aria-label="enter the status of your subtask">
              <select
                {...register("status", { required: true })}
                value={status}
                onChange={(e) => setStatus(e.currentTarget.value)}
                className={`cursor-pointer px-4 py-2 h-10 font-medium text-sm/6 border-1 border rounded-lg 
                ${theme === "light" 
                ? "border-light_Blue text-_gray" 
                : "border-medium_Gray text-_white"
                } w-full bg-transparent
                `}
                name="status"
                id="status"
              >
                <option 
                  value="" 
                  style={{ backgroundColor: theme === "light" ? "white" : "#20212C" }}
                  className={`rounded-lg ${
                    theme === "light" 
                    ? "text-_dark" 
                    : "text-_white"
                  }`}>
                  Select an option
                </option>
                {boardData.boards.map((board) => {
                  if (board.name !== nameBoard) {
                    return null;
                  }
                  return board.columns.map((col, index) => (
                    <option
                      key={index}
                      value={col.name}
                      style={{ backgroundColor: theme === "light" ? "white" : "#20212C" }}
                      className={`rounded-lg ${
                        theme === "light" 
                        ? "text-_dark" 
                        : "text-_white"
                      }`}
                    >
                      {col.name}
                    </option>
                  ));
                })}
              </select>
            </label>
            <Button
              type="submit"
              size="small"
              label="Create Task"
              backgroundColor="#635FC7" 
              textColor="#FFF"
              ariaLabel="Create Task"
            />
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default AddTaskModal;