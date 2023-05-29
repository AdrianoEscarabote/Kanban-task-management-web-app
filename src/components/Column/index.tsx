import { ColumnProps } from "./ColumnProps";
import Task from "../Task";
import { dragTask } from "../../redux/board/reducer";
import { useSelector } from "react-redux";
import { rootState } from "@/redux/reduxTypes";
import { useDispatch } from "react-redux";
import style from "./style.module.css"

const Column: React.FC<ColumnProps> = ({ colIndex }) => {
  const dispatch = useDispatch();
  const { nameBoard } = useSelector(
    (rootReducer: rootState) => rootReducer.reducerNameBoard
  );
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const boardData = useSelector((rootReducer: rootState) => rootReducer.boardSlice);
  const board = boardData.boards.find((board) => board.name === nameBoard);
  const columns = board?.columns;
  const col = columns?.find((col, i) => i === colIndex);

  const handleOnDrop = (e: React.DragEvent<HTMLUListElement>) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(
        dragTask({
          boardName: nameBoard,
          currentColIndex: prevColIndex,
          prevColIndex: colIndex,
          taskIndex,
        })
      );
    }
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault();
  };

  return (
    <div className='flex flex-col mt-1 gap-4 h-full'
    key={colIndex + 1}
    style={{minHeight: "87vh"}}>
      <h3 
        className={`${style.tasks_count} font-bold z-10 uppercase 
        ${theme === "light" 
        ? "text-_dark" 
        : "text-_white"} 
        ${col?.name === "Todo" 
        ? "todo pl-6 relative" 
        : ""}
        ${col?.name === "Doing" 
        ? "doing pl-6 relative"
        : ""}
        ${col?.name === "Done" 
        ? "done relative pl-6"
        : ""}
        `}>
          {col?.name} ({col?.tasks ? col.tasks.length : 0 })
        </h3>
      <ul 
        className={`h-full rounded-md mt-2 flex flex-col
        ${col?.tasks?.length === 0 || !col?.tasks 
        ? theme === "light" 
        ? "col-gradient" 
        : "col-gradient-dark" 
        : "" }`} 
        onDrop={handleOnDrop} 
        onDragOver={handleOnDragOver}
        style={{ width: "280px", minHeight: "80vh" }} 
      >
        {col?.tasks.map((task, index: number) => {
          return (
            <Task key={index} taskName={task.title} taskIndex={index} colIndex={colIndex} />
          );
        })}
      </ul>
    </div>
  );
}

export default Column