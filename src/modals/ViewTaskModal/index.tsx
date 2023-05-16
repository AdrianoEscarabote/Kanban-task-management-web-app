import { useEffect, useState } from "react";
import { ViewTaskModalProps, sideTaskTypes } from "./ViewTaskModalProps"
import { useSelector } from "react-redux";
import { rootState } from "@/redux/reduxTypes";
import EllipsisTask from "../../components/shared/EllipsisTask"
import { useDispatch } from "react-redux";
import { changeCheckboxChecked, changeStatus } from "../../redux/board/reducer";
import { Subtask } from "@/redux/board/boardTypes";
import Button from "../../components/shared/Button";
import { selectCheckboxCheckedCount } from "../../redux/board/selectors";
import style from "./style.module.css"

const ViewTaskModal: React.FC<ViewTaskModalProps> = ({ openEditTaskModal, closeModal, taskTarget, openDeleteTaskModal }) => {
  const dispatch = useDispatch()
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const boardData = useSelector((rootReducer: rootState) => rootReducer.boardSlice)
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const [sideTasks, setSideTasks] = useState<sideTaskTypes[]>([])
  const [description, setDescription] = useState<string>("")
  const [status, setStatus] = useState<string>("");
  const [initialStatus, setInitialStatus] = useState<string>(status); 
  const [subtasks, setSubtasks] = useState<Subtask[]>([])
  const selectCheckboxCount = selectCheckboxCheckedCount(taskTarget)
  const checkboxCheckedCount  = useSelector(selectCheckboxCount)
  
  useEffect(() => {
    boardData.boards.map(board => board.columns.map(col => col.tasks?.filter(task => {
      if (task.title === taskTarget) {
        setSideTasks([...sideTasks, task])
        setDescription(task.description)
        setSubtasks(task.subtasks)
        setStatus(task.status)
        setInitialStatus(status)
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

  const handleChangeCheckboxChecked = (title: string, isCompleted: boolean) => {
    dispatch(changeCheckboxChecked({ title: title, isCompleted: isCompleted }))
    setSubtasks(prevSubtasks => prevSubtasks.map(subtask => {
      if (subtask.title === title) {
        return { ...subtask, isCompleted }
      } else {
        return subtask
      }
    }))
  }
  
  return (
    <div onClick={() => {
      closeModal()
    }} className={`parent_modal fixed top-0 left-0 flex items-center justify-center z-50 p-4 h-screen w-full bg-modalParentBgLight`}>
  
      <section 
        role="dialog"    
        aria-label="View Task" 
        aria-describedby="modal-content" 
        className={`${style.modal} max-w-md h-auto overflow-y-scroll w-full flex flex-col gap-4 p-8 rounded-md 
        ${theme === "light" 
        ? "bg-_white" 
        : "bg-dark_Gray"}`} 
        onClick={(e) => e.stopPropagation()}
      >

        {
          sideTasks.map((task, index) => (
            <div key={index}>
              <div className="flex items-center relative w-full overflow-visible justify-between">
                <h2 className={`mb-4 font-bold text-lg ${theme === "light" ? "text-_dark" : "text-_white"}`}>{task.title}</h2>
                <EllipsisTask openEditTaskModal={() => openEditTaskModal()} openDeleteTaskModal={openDeleteTaskModal} closeModal={closeModal} />
              </div>
              {
                task.description ? <p className={`mb-4 font-medium text-sm text-_gray`}>{task.description}</p> : null
              }
              <p className={`${theme === "light" ? "text-_gray" : "text-_white"} font-medium text-sm text-_gray`}>Subtask ({checkboxCheckedCount} of {task.subtasks.length})</p>
              <div className="flex flex-col gap-2 my-4">
                {
                  subtasks.map((sub, index) => (
                    <label aria-label="subtask title" key={index} className={`cursor-pointer py-3 px-3 ${theme === "light" ? "bg-almost_White" : "bg-almost_Dark"} flex items-center gap-4`} htmlFor={`radio-${index}`}>
                      <input 
                        type="checkbox" 
                        style={{ accentColor: "#635fc7" }}
                        onChange={() => {
                          handleChangeCheckboxChecked(sub.title, !sub.isCompleted)
                        }} 
                        checked={sub.isCompleted} 
                        name={`radio-${index}`} 
                        id={`radio-${index}`}
                        key={`checkbox-${index}`}
                      />
                      <span className={`${theme === "light" ? "text-_dark" : "text-_white"} font-bold text-xs/4 ${sub.isCompleted ? "text-opacity-50 line-through" : ""}`}>{sub.title}</span>
                    </label>
                  ))
                }
              </div>
              <h3 className={`font-medium text-sm mb-4 ${theme === "light" ? "text-_gray" : "text-_white"}`}>Current Status</h3>
              <label aria-label="select task status" htmlFor="status" className="my-10 cursor-pointer">
                <select
                defaultValue={status}
                onChange={(e) => {
                  setStatus(e.currentTarget.value)
                }}
                className={`cursor-pointer px-4 py-2 h-10 font-medium text-sm/6 border-1 border rounded-lg ${theme === "light" ? "border-light_Blue text-_dark" : "border-medium_Gray text-_white"} w-full bg-transparent`} 
                name="status" 
                id="status">
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
              <div className="mt-5">
                <Button 
                  ariaLabel="Save changes"
                  label="Save" 
                  size="small"
                  backgroundColor="#635FC7" 
                  textColor="#fff" 
                  onClick={() => {
                    if (initialStatus !== status) {
                      dispatch(
                        changeStatus({
                          boardName: nameBoard,
                          name: taskTarget,
                          status: status,
                          description: description,
                          subtasks: subtasks,
                        })
                      );
                      setInitialStatus(status);
                    }
                    closeModal();
                  }} 
                />
              </div>
            </div>
          ))
        }
      </section>
    </div>
  )
}

export default ViewTaskModal;