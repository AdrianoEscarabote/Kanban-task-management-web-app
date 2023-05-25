import { useEffect, useState } from "react"
import { AddBoardModalProps, FormData, Columns } from "./AddBoardModalProps"
import { useSelector } from "react-redux"
import { rootState } from "@/redux/reduxTypes"
import Image from "next/image"
import Button from "../../components/shared/Button"
import { useDispatch } from "react-redux"
import { createNewBoard } from "../../redux/board/reducer"
import { Column } from "@/redux/board/boardTypes"
import style from "./style.module.css"
import { useForm } from "react-hook-form";
import { setNameBoard } from "../../redux/nameBoard/actions"

const AddBoardModal: React.FC<AddBoardModalProps> = ({ closeModal }) => {
  const [columns, setColumns] = useState<Columns[]>([{id: 1, value: "Todo"}, {id: 2, value: "Doing"}])
  const [nameInput, setNameInput] = useState<string>("");
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const dispatch = useDispatch()
  const boardData = useSelector((rootReducer: rootState) => rootReducer.boardSlice)

  const handleAddNewBoard = () => {
    const arrFormatted = columns.map(item => {
      const obj: Column = {
        name: item.value,
        tasks: []
      };
      return obj;
    });
    dispatch(createNewBoard({ name: nameInput, columns: arrFormatted }));
    dispatch(setNameBoard(nameInput))
  };

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const handleAddColumn = () => {
    const newId = columns.length + (Math.random() * 9)
    const newInput = {id: newId, value: ""}
    setColumns([...columns, newInput])
  }  

  const handleRemoveColumn = (id: number) => {
    const updatedColumns = columns.filter(col => col.id !== id)
    setColumns(updatedColumns)
  }

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>()  

  const onSubmit = handleSubmit(() => {
    handleAddNewBoard()  
    closeModal()
  })

  return (
    <div data-testid="modal" onClick={() => closeModal()} className={`parent_modal fixed top-0 left-0 flex items-center justify-center p-4 z-50 h-screen w-full bg-modalParentBgLight`}>
      <section 
        role="dialog" 
        aria-label="Add new Board" 
        aria-describedby="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        className={`${style.modal} flex flex-col gap-2 overflow-y-scroll font-bold text-lg/6 p-8 rounded-md w-full 
        ${theme === "light" 
        ? "bg-_white" 
        : "bg-almost_Dark"}`
        }
      >
        <h2 className={`${theme === "light" ? "text-_dark" : "text-_white"}`}>Add new board</h2>
        <form onSubmit={onSubmit}> 
          <fieldset className="flex flex-col gap-2">
            <legend className="sr-only">enter board details</legend>
            <label htmlFor="name" 
            className={`relative flex flex-col gap-2 font-bold text-xs 
              ${theme === "light" 
              ? "text-_gray" 
              : "text-_white"}`
            }>
              Name
              <input 
                {...register("nameInput", { required: true })} 
                value={nameInput} 
                onChange={(e) => {
                  setValue("nameInput", e.currentTarget.value)
                  setNameInput(e.currentTarget.value)
                }} 
                className={`
                  ${errors.nameInput 
                  ? "error_input" 
                  : ""} px-4 py-2 rounded-md bg-transparent h-10 w-full border border-1 
                  ${theme === "light" 
                  ? "border-light_Blue text-_dark" 
                  : "border-medium_Gray text-_white"} 
                `} 
                type="text" 
                name="name" 
                id="name" 
                placeholder="e.g. Web Design" 
                data-testid="inputName"
              />
              {
                boardData.boards.filter(board => board.name === nameInput).length === 0 ?
                null : (
                  <span className="absolute text-_red right-3 top-0">Repeated name</span>
                )
              }
              <span></span>
              <span className="absolute text-_red right-3 top-9">
                {errors.nameInput && "Can’t be empty"}
              </span>
            </label>
            
            <div className="flex flex-col gap-4 mt-1">
              <h3 className={`font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>Columns</h3>
              {columns.map(({ id, value }) => (
                <label 
                  aria-label="Put the subtask name" 
                  key={id} 
                  htmlFor={`columns${id}`} 
                  className={`mt-4 gap-2 font-bold text-xs 
                  ${theme === "light" ? "text-_gray" : "text-_white"}`}
                >
                  <div className="flex items-center my-2">
                    <input 
                      {...register(`columns.${id}`, { required: true })}
                      value={value} 
                      onChange={(ev) => {
                        setValue(`columns.${id}`, ev.currentTarget.value);
                        handleChangeInput(id, ev.currentTarget.value)
                      }} 
                      className={`px-4 py-2 rounded-md bg-transparent h-10 w-full border border-1 
                      ${theme === "light" ? "border-light_Blue text-_dark" : "border-medium_Gray text-_white"} `} 
                      type="text" 
                      id={`columns${id}`} 
                      data-testid={`column-${id}`}
                    />

                    <button
                      type="button" 
                      className="w-10 grid place-content-center" 
                      onClick={() => handleRemoveColumn(id)}
                      aria-label="remove input"
                    >
                      <Image src="/assets/icon-cross.svg" width="15" height="15" alt="" />
                    </button>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-4">
              <Button 
                size="small" 
                label="+ Add New Column" 
                textColor="#635FC7" 
                backgroundColor={`
                ${theme === "light" 
                ? "#635fc719" 
                : "#FFF"}`} 
                onClick={handleAddColumn} 
                ariaLabel="Cancel"
              />
              <Button 
                type="submit" 
                size="small" 
                label="Create New Board"
                backgroundColor="#635FC7" 
                textColor="#FFF" 
                ariaLabel="Create New Board"
              />
            </div>

          </fieldset>
        </form>
      </section>
    </div>
  ) 
}

export default AddBoardModal