import { useSelector } from "react-redux";
import { EditBoardProps } from "./EditBoardProps";
import { rootState } from "@/redux/reduxTypes";
import Button from "../Button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { editBoard } from "@/redux/board/reducer";
import { setNameBoard } from "@/redux/nameBoard/actions";
import { BoardEditNewType } from "@/redux/board/boardTypes";

const EditBoard: React.FC<EditBoardProps> = ({ closeModal }) => {
  const dispatch = useDispatch()
  const boardNames = useSelector((rootReducer: rootState) => rootReducer.boardSlice)
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer) 
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const [inputNameValue, setInputValueName] = useState<string>(nameBoard ? nameBoard : boardNames.boards[0].name)
  const colNames = boardNames.boards
  .filter((board) => board.name === (nameBoard ? nameBoard : boardNames.boards[0].name))
  .map(item => item.columns.map(col => col.name))
  .flat()

  useEffect(() => {
    window.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        closeModal()
      } 
    })
  })

  const [columns, setColumns] = useState(
    colNames.map((name, index) => ({ id: index + 1, value: name }))
  )

  const handleChangeInput = (id: number, value: string) => {
    const updatedColumns = columns.map((col) => {
      if (col.id === id) {
        return {
          ...col,
          value: value
        }
      }
      return col
    })
    setColumns(updatedColumns)
  }

  const handleRemoveInput = (id: number) => {
    const updatedColumns = columns.filter(col => col.id !== id)
    setColumns(updatedColumns)
  }

  const handleAddInput = () => {
    const newId = columns.length + (Math.random() * 9)
    const newInput = {id: newId, value: ""}
    setColumns([...columns, newInput])
  }

  const handleClickButtonEditBoard = () => {
    const columnsObj: BoardEditNewType[] = []
    columns.map(col => columnsObj.push({ name: col.value }) )

    
    dispatch(setNameBoard(inputNameValue))
    dispatch(editBoard({ nameToAdd: inputNameValue, nameBoard: nameBoard, boards: columnsObj }))
  }
  
  return (
    <div onClick={() => closeModal()} className={`fixed top-0 left-0 flex items-center justify-center z-50 h-screen w-full bg-modalParentBgLight`}>
  
      <section style={{ maxHeight: "429px" }} className={`max-w-md overflow-y-scroll w-full flex flex-col gap-4 p-8 rounded-md ${theme === "light" ? "bg-_white" : "bg-dark_Gray"}`} onClick={(e) => e.stopPropagation()}>

        <h2 className={`font-bold text-lg ${theme === "light" ? "text-_gray" : "text-_white"}`}>Edit Board</h2>

        <label htmlFor="name" className={`flex flex-col my-3 gap-2 font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>
          Board Name
          <input value={inputNameValue} onChange={(e) => setInputValueName(e.currentTarget.value)} className={`px-4 py-2 rounded-md bg-transparent h-10 w-full border border-1 ${theme === "light" ? "border-light_Blue" : "border-medium_Gray"} `} type="text" name="name" id="name"  />
        </label>

        <h3 className={`font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>Columns</h3>

        {
          columns.map(({ id, value }) => (
            <label key={id} htmlFor={`subtasks${id}`} className={`flex gap-2 font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>

              <input value={value} onChange={(ev) => handleChangeInput(id, ev.currentTarget.value)} className={`px-4 py-2 rounded-md bg-transparent h-10 max-w-sm w-full border border-1 ${theme === "light" ? "border-light_Blue" : "border-medium_Gray"} `} type="text" name="subtask" id={`subtasks${id}`} placeholder="e.g. Make coffee" />

              <button type="button" className="w-10 grid place-content-center" onClick={() => handleRemoveInput(id)}>
                <Image src="/assets/icon-cross.svg" width="15" height="15" alt="" />
              </button>
            </label>
          ))
        }

        <div className="flex flex-col items-center gap-4">
          <Button size="small" label="+ Add New Column" textColor="#635FC7" backgroundColor={`${theme === "light" ? "#635fc719" : "#FFF"}`} onClick={handleAddInput}  />

          <Button size="small" label="Save Changes" backgroundColor="#635FC7" textColor="#FFF" onClick={() => {
            closeModal()
            handleClickButtonEditBoard()
          }} />
        </div>

      </section>

    </div>
  )
}

export default EditBoard;