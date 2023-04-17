import { rootState } from "@/redux/reduxTypes";
import useBoardNames from "@/custom/boardNames/useBoardNames";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNameBoard } from "@/redux/nameBoard/actions";
import { useState } from "react";
import AddBoardModal from "../AddBoardModal/AddBoardModal";

const ListBoardNames = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const { boardNames } = useBoardNames()
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const dispatch = useDispatch()

  const handleClickButton = (payload: string) => {
    dispatch(setNameBoard(payload))
  }

  const handleClickButtonModalBoard = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <section className="py-3 pr-6">
      <p className="pl-5 text-_gray font-bold text-xs">ALL BOARDS ( {boardNames.boards.length} )</p>    
      <ul className="flex items-start flex-col gap-2 mt-4 font-bold text-sm/5 text-_gray">
          {
            boardNames.boards.map((board, index) => (
              <li key={index} className="w-full p-0">
                <button onClick={(ev) => handleClickButton(ev.currentTarget.innerText)} className="pl-5 w-full mr-3 hover:text-_white hover:bg-purple_Dark rounded-r-3xl rounded-br-3xl flex items-center gap-4 h-12">
                  <Image src="/assets/icon-board.svg" height="16" alt="" width="16" />
                  {board.name}
                </button>
              </li>
            ))
          }
          <button onClick={handleClickButtonModalBoard} className="pl-5 w-full mr-3 hover:text-_white hover:bg-purple_Dark rounded-r-3xl rounded-br-3xl flex items-center gap-4 h-12">
            <Image src="/assets/icon-board.svg" height="16" alt="" width="16" />
            + Create New Board
          </button>
          {
            modalOpen ? <AddBoardModal closeModal={handleClickButtonModalBoard} /> : null
          } 
      </ul>
    </section>
  )
};

export default ListBoardNames;