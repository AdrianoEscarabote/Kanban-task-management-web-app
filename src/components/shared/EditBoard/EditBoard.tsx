import { useSelector } from "react-redux";
import { EditBoardProps } from "./EditBoardProps";
import { rootState } from "@/redux/reduxTypes";
import Button from "../Button/Button";
import { useEffect, useState } from "react";

const EditBoard: React.FC<EditBoardProps> = ({ closeModal }) => {
  const boardNames = useSelector((rootReducer: rootState) => rootReducer.boardSlice)
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer) 
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const [inputNameValue, setInputValueName] = useState<string>(nameBoard ? nameBoard : boardNames.boards[0].name)

  useEffect(() => {
    window.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        closeModal()
      } 
    })
  })

  return (
    <div onClick={() => closeModal()} className={`fixed top-0 left-0 flex items-center justify-center z-50 h-screen w-full bg-modalParentBgLight`}>
  
      <section className={`max-w-md w-full flex flex-col gap-4 p-8 rounded-md ${theme === "light" ? "bg-_white" : "bg-dark_Gray"}`} onClick={(e) => e.stopPropagation()}>


      <label htmlFor="name" className={`flex flex-col my-4 gap-2 font-bold text-xs ${theme === "light" ? "text-_gray" : "text-_white"}`}>
        Board Name
        <input value={inputNameValue} onChange={(e) => setInputValueName(e.currentTarget.value)} className={`px-4 py-2 rounded-md bg-transparent h-10 w-full border border-1 ${theme === "light" ? "border-light_Blue" : "border-medium_Gray"} `} type="text" name="name" id="name"  />
      </label>

      <div className="flex flex-col items-center gap-4">
        <Button size="small" label="+ Add New Column" textColor="#635FC7" backgroundColor={`${theme === "light" ? "#635fc719" : "#FFF"}`}  />

        <Button size="small" label="Save Changes" backgroundColor="#635FC7" textColor="#FFF" />
      </div>


      </section>

    </div>
  )
}

export default EditBoard;