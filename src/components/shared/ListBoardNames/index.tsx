import { rootState } from "@/redux/reduxTypes";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNameBoard } from "../../../redux/nameBoard/actions";
import { useState } from "react";
import AddBoardModal from "../../../modals/AddBoardModal";
import style from "./style.module.css"
import { selectBoardsCount } from "../../../redux/board/selectors";
import { ListBoardNamesProps } from "./ListBoardNamesProps";

const ListBoardNames: React.FC<ListBoardNamesProps> = ({ closeModal }) => {
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const boardData = useSelector((rootReducer: rootState) => rootReducer.boardSlice)
  const dispatch = useDispatch()
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const boardsCount = useSelector(selectBoardsCount)
  
  const handleClickButton = (payload: string) => {
    dispatch(setNameBoard(payload))
    if (closeModal) {
      closeModal()
    }
  }

  const handleClickButtonModalBoard = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <section className={`pt-5 pb-3 right-6 ${style.section} h-full`}>
      <p className={`${style.boards_number} pl-8 text-_gray font-bold text-xs`}>ALL BOARDS ( { boardsCount } )</p>    
      <ul className={`${style.list} flex items-start flex-col mt-5 font-bold text-sm/5 text-_gray`}>
          {
            boardData.boards.map((board, index) => (
              <li key={index} className="w-full p-0">
                <button 
                  aria-label={`see board ${board.name}`}
                  onClick={(ev) => handleClickButton(board.name)} 
                  className={`
                  ${style.button}
                  ${nameBoard === board.name 
                  ? "bg-purple_Dark text-_white" 
                  : "" }
                  pl-8 w-full font-bold
                  ${theme === "light" 
                  ? "hover:text-purple_Dark hover:bg-purple_superLight" 
                  : "hover:text-purple_Dark hover:bg-_white"
                  } rounded-r-3xl rounded-br-3xl flex items-center gap-4 h-12`}
                  data-testid={`btn-name-board-${index}`}
                >
                  <Image
                    src="/assets/icon-board.svg" 
                    height="16" 
                    alt="" 
                    width="16" 
                  />
                  {board.name}
                </button>
              </li>
            ))
          }
          <li className="w-full p-0">
            <button 
            aria-label="create new board"
            onClick={handleClickButtonModalBoard} 
            className="pl-8 w-full mr-3 text-purple_Dark hover:text-_white hover:bg-purple_Dark rounded-r-3xl rounded-br-3xl flex items-center gap-4 h-12">
              <Image className="filter_purple" src="/assets/icon-board.svg" height="16" alt="" width="16" />
              + Create New Board
            </button>
          </li>
      </ul>
      {
        modalOpen ? <AddBoardModal closeModal={handleClickButtonModalBoard} /> : null
      } 
    </section>
  )
};

export default ListBoardNames;