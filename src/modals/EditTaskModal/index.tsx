import { rootState } from "@/redux/reduxTypes"
import { useSelector } from "react-redux"
import { EditTaskModalProps, Subtask, formData } from "./EditTaskModalProps"
import { useEffect, useState } from "react"
import Button from "../../components/shared/Button"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { EditTask, changeStatus } from "../../redux/board/reducer"
import style from "./style.module.css"
import { useForm } from "react-hook-form"

const EditTaskModal: React.FC<EditTaskModalProps> = ({ closeModal, task }) => {
  const boardData = useSelector((rootReducer: rootState) => rootReducer.boardSlice)
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const [title, setTitle] = useState<string>("");
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const [description, setDescription] = useState<string>("")
  const dispatch = useDispatch()
  const [subtasks, setSubtasks] = useState<Subtask[]>([])
  const [status, setStatus] = useState<string>("");
  const [initialStatus, setInitialStatus] = useState<string>(status); 
  
  const handleChangeInput = (index: number, value: string) => {
    setSubtasks(prevSubtasks => {
      const updatedSubtasks = [...prevSubtasks];
      updatedSubtasks[index] = {
        ...updatedSubtasks[index],
        title: value
      };
      return updatedSubtasks;
    });
  };
  
  const handleRemoveSubtask = (id: number) => {
    setSubtasks(prevSubtasks => {
      const index = prevSubtasks.findIndex(task => task.id === id);
      if (index === -1) {
        return prevSubtasks;
      }
      const newSubtasks = [...prevSubtasks];
      newSubtasks.splice(index, 1);
      return newSubtasks;
    });
  };

  const [nextId, setNextId] = useState<number>(0);

  const handleAddSubtask = () => {
    const newSubtask = { id: nextId, title: "", isCompleted: false };
    setSubtasks(prevSubtasks => [...prevSubtasks, newSubtask]);
    setNextId(prevNextId => prevNextId + 1);
  };

  const handleEditTask = () => {
    dispatch(EditTask({ 
      description: description,
      status: status,
      subtasks: subtasks,
      title: title,
      oldName: task,
     }))
    closeModal()
  }

  useEffect(() => {
    boardData.boards.map(board => board.columns.map(col => col.tasks.filter(tasks => {
      if (tasks.title === task) {
        setTitle(tasks.title)
        setDescription(tasks.description)
        setStatus(tasks.status)
        setInitialStatus(status)
        setValue("title", tasks.title)
        const newSubtasks = tasks.subtasks.map(sub => {
          const newId = subtasks.length + 1
          const newSubtask: Subtask = { id: newId, isCompleted: sub.isCompleted, title: sub.title }
          return newSubtask
        })
        setSubtasks([...subtasks, ...newSubtasks])
      }
    })))
  }, [])

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<formData>()

  const onSubmit = handleSubmit(() => {
    if (initialStatus !== status) {
      dispatch(
        changeStatus({
          boardName: nameBoard,
          name: task,
          status: status,
          description: description,
          subtasks: subtasks,
        })
      );
      setInitialStatus(status);
    }
    closeModal();
    handleEditTask()
  })
 
  return (
    <div onClick={() => closeModal()} className={`parent_modal fixed top-0 left-0 flex items-center justify-center p-4 z-50 h-screen w-full bg-modalParentBgLight`}>
      <section onClick={(e) => e.stopPropagation()} className={`${style.modal} overflow-y-scroll font-bold text-lg/6 p-8 rounded-md w-full max-w-lg ${theme === "light" ? "bg-_white" : "bg-almost_Dark"}`}>
        <div className="flex items-center relative w-full overflow-visible justify-between">
          <h2 className={`font-bold text-lg ${theme === "light" ? "text-_dark" : "text-_white"}`}>Edit Task</h2>
        </div>
        <form onSubmit={onSubmit}>
          <fieldset className="border-none flex flex-col gap-4 mt-5">
            <legend className="sr-only">put your task information</legend>
            <label 
              htmlFor="title"
              className={`flex relative flex-col gap-2 font-bold text-xs 
              ${theme === "light" 
              ? "text-_gray" 
              : "text-_white"}`
             }>
              Title
              <input 
                {...register("title", { required: true })}
                value={title}
                onChange={(e) => {
                  setTitle(e.currentTarget.value)
                  setValue("title", e.currentTarget.value)
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
            <label htmlFor="description" className={`flex flex-col gap-2 font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>
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
                <label key={task.id} htmlFor={`subtasks${task.id}`} className={`flex gap-2 font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>
                  <input
                    {...register(`subtasks.${index}`, { required: true })}
                    value={task.title}
                    onChange={(e) => {
                      handleChangeInput(index, e.currentTarget.value)
                      setValue(`subtasks.${index}`, e.currentTarget.value)
                    }}
                    className={`px-4 py-2 rounded-md bg-transparent h-10 max-w-sm w-full border border-1 
                    ${theme === "light" 
                    ? "border-light_Blue text-_dark" 
                    : "border-medium_Gray text-_white"}`}
                    placeholder="e.g. Make coffee"
                    type="text"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(task.id)}
                    className="w-10 grid place-content-center"
                  >
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
                value={status} 
                onChange={(e) => setStatus(e.currentTarget.value)} 
                className={`px-4 py-2 h-10 font-medium text-sm/6 border-1 border rounded-lg 
                ${theme === "light" 
                ? "border-light_Blue text-_dark" 
                : "border-medium_Gray text-_white"} w-full bg-transparent`} 
                name="status" 
                id="status"
              >
                {
                  boardData.boards.filter(board => board.name === nameBoard).map(board => board.columns.map((col, index) => (
                    <option 
                    key={index}
                    className={`cursor-pointer rounded-lg ${theme === "light" ? "text-_dark bg-_white" : "text-_white bg-almost_Dark"}`} 
                    value={col.name}>
                      {col.name}
                    </option>
                  )))
                }
              </select>
            </label>
            <Button 
              size="small" 
              label="Save Task" 
              backgroundColor="#635FC7" 
              textColor="#FFF" 
              type="submit"
            />
          </fieldset>
        </form>
      </section>
    </div>
  )
}

export default EditTaskModal