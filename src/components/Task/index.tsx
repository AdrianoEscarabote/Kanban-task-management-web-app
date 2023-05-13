import { rootState } from "@/redux/reduxTypes";
import { useState } from "react";
import { useSelector } from "react-redux";
import ViewTaskModal from "../../modals/ViewTaskModal";
import DeleteTaskModal from "../../modals/DeleteTaskModal";
import EditTaskModal from "../EditTask";
import { TaskProps } from "./TaskProps";

const Task: React.FC<TaskProps> = ({ taskIndex, colIndex, taskName}) => {
  const { nameBoard } = useSelector((rootReducer: any) => rootReducer.reducerNameBoard)
  const boardData = useSelector((rootReducer: any) => rootReducer.boardSlice)
  const board = boardData.boards.filter((board: any) => board.name === nameBoard)[0]
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const columns = board.columns;
  const col = columns.find((col: any, i: number) => i === colIndex);
  const task = col.tasks.find((task: any, i: number) => i === taskIndex);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask: any) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [viewTaskModalOpen, setViewTaskModalOpen] = useState<boolean>(false)
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState<boolean>(false)
  const [editTaskModalOpen, setEditTaskModalOpen] = useState<boolean>(false)

  const handleOnDrag = (e: React.DragEvent<HTMLButtonElement>) => {
    e.dataTransfer.setData("text", JSON.stringify({taskIndex, prevColIndex: colIndex}));
  }

  return (
    <>
      <li>
        <button
          draggable
          onDragStart={handleOnDrag}
          style={{ boxShadow: "0px 4px 6px rgba(54, 78, 126, 0.101545)" }}  
          className={`rounded-lg py-6 px-4 w-full mb-5 text-start
        ${theme === "light" 
        ? "bg-_white" 
        : "bg-dark_Gray"}` }
          onClick={() => {
            setViewTaskModalOpen(!viewTaskModalOpen)
          }}
        >
          <div className="flex flex-col gap-2">
              <p className={`text-start font-bold text-base/5 
              ${theme === "light" 
              ? "text-_dark" 
              : "text-_white"}`}>
                {task.title}
              </p>
            {
              subtasks.length !== 0 ? (<>
              <p className={`text-_gray font-bold text-xs self-start`}>
                {completed} of {subtasks.length} subtasks
              </p>
              </>) : null
            }
          </div>
        </button>
      </li>
      {viewTaskModalOpen 
      ? <ViewTaskModal taskTarget={taskName} openDeleteTaskModal={() => setDeleteTaskModalOpen(!deleteTaskModalOpen)} openEditTaskModal={() => setEditTaskModalOpen(!editTaskModalOpen)} closeModal={() =>       setViewTaskModalOpen(false)} /> 
      : null}
      {deleteTaskModalOpen 
      ? <DeleteTaskModal NameToDelete={taskName} closeModal={() => setDeleteTaskModalOpen(!deleteTaskModalOpen)} /> 
      : null}
      {editTaskModalOpen 
      ? <EditTaskModal task={taskName} closeModal={() => setEditTaskModalOpen(!editTaskModalOpen)} /> 
      : null} 
   </>
  );
}

export default Task;