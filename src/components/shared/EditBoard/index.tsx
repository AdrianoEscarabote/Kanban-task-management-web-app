import { useSelector } from "react-redux";
import { EditBoardProps, formData } from "./EditBoardProps";
import { rootState } from "@/redux/reduxTypes";
import Button from "../Button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { editBoard } from "@/redux/board/reducer";
import { setNameBoard } from "@/redux/nameBoard/actions";
import { BoardEditNewType } from "@/redux/board/boardTypes";
import style from "./style.module.css"
import { useForm } from "react-hook-form";

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
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<formData>()

  const onSubmit = handleSubmit(() => {
    closeModal()
    handleClickButtonEditBoard()
  })  
  
  return (
    <div onClick={() => closeModal()} className={`parent_modal fixed top-0 left-0 flex items-center justify-center p-4 z-50 h-screen w-full bg-modalParentBgLight`}>
      <section 
        className={`${style.modal} max-w-md overflow-y-scroll w-full flex flex-col gap-4 p-8 rounded-md 
        ${theme === "light" 
        ? "bg-_white" 
        : "bg-dark_Gray"}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`font-bold text-lg 
        ${theme === "light" 
        ? "text-_gray" 
        : "text-_white"}
        `}>
          Edit Board
        </h2>
        <form onSubmit={onSubmit}>
          <fieldset>
            <legend className="sr-only">enter information to edit the table</legend>
            <label 
              htmlFor="name" 
              className={`flex relative flex-col my-3 gap-2 font-bold text-xs 
              ${theme === "light" 
              ? "text-_gray" 
              : "text-_white"}
            `}>
              Board Name
              <input 
                {...register("nameBoard", { required: true })}
                value={inputNameValue} 
                onChange={(e) => {
                  setValue("nameBoard", e.currentTarget.value)
                  setInputValueName(e.currentTarget.value)
                }} 
                className={`
                ${errors.nameBoard 
                ? "error_input" 
                : ""} 
                px-4 py-2 rounded-md bg-transparent h-10 w-full border border-1 
                ${theme === "light" 
                ? "border-light_Blue" 
                : "border-medium_Gray"} 
                `} 
                type="text" 
                name="name" 
                id="name" 
              />
              <span className="absolute text-_red right-3 top-9">
                {errors.nameBoard && "Can’t be empty"}
              </span>
            </label>
            <h3 className={`font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>Columns</h3>
            <div className="flex flex-col gap-3 py-3">
              {
                columns.map(({ id, value }) => (
                  <label key={id} htmlFor={`subtasks${id}`} className={`flex gap-2 font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>

                    <input 
                      {...register(`columns.${id}.value`, { required: true })}
                      value={value} 
                      onChange={(ev) => {
                        setValue(`columns.${id}.value`, ev.currentTarget.value)
                        handleChangeInput(id, ev.currentTarget.value)
                      }} 
                      className={`px-4 py-2 rounded-md bg-transparent h-10 max-w-sm w-full border border-1 
                      ${theme === "light" 
                      ? "border-light_Blue" 
                      : "border-medium_Gray"} `} 
                      type="text" 
                      name="subtask" 
                      id={`subtasks${id}`} 
                      placeholder="e.g. Make coffee" 
                    />                  
                    <button 
                      type="button" 
                      className="w-10 grid place-content-center" 
                      onClick={() => handleRemoveInput(id)}
                    >
                      <Image src="/assets/icon-cross.svg" width="15" height="15" alt="" />
                    </button>
                  </label>
                ))
              }
            </div>
            <div className="flex flex-col items-center gap-4">
              <Button 
                size="small" 
                label="+ Add New Column" 
                textColor="#635FC7" 
                backgroundColor={`
                  ${theme === "light" 
                  ? "#635fc719" 
                  : "#FFF"}
                `} 
                onClick={handleAddInput} 
              />
              <Button 
                size="small" 
                type="submit"
                label="Save Changes" 
                backgroundColor="#635FC7" 
                textColor="#FFF" 
              />
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  )
}

export default EditBoard;