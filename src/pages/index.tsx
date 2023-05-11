import { useSelector, useDispatch } from "react-redux";
import { rootState } from "@/redux/reduxTypes";
import { setNameBoard } from "@/redux/nameBoard/actions";
import useBoardData from "@/custom/boardData/useBoardData";
import { useEffect, useState } from "react";
import EditBoard from "@/modals/EditBoard";
import Column from "@/components/Column";
import Head from "next/head";

const Board = () => {
  const dispatch = useDispatch();
  useBoardData();
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard);
  const boardData = useSelector((rootReducer: rootState) => rootReducer.boardSlice);
  const board = boardData.boards.find((board) => board.name === nameBoard);
  const columns = board?.columns;
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const [editBoardOpen, setEditBoardOpen] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem("nameBoard")) {
      dispatch(setNameBoard(localStorage.getItem("nameBoard")!));
    } else {
      localStorage.setItem("nameBoard", "Platform Launch");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Frontend Mentor | Kanban task management web app</title>
      </Head>
      <main className={`flex overflow-x-scroll gap-6 py-6 px-4 pt-24 transition min-h-screen duration-0
      ${theme === "light" 
      ? "bg-almost_White" 
      : "bg-almost_Dark" }`}>
        <section className='h-full flex items-start gap-6 p-5'>
          {columns?.length ? (
            <>
              {columns.map((col, index) => {
                return <Column key={index} colIndex={index} />;
              })}
              <button 
                  style={{ height: "84vh" }} 
                  className={`${theme === "light" ? "col-gradient" : "col-gradient-dark"} font-bold text-2xl/8 text-center text-_gray flex flex-col items-center justify-center gap-5 w-72 rounded-md relative top-8`}
                  onClick={() => setEditBoardOpen(!editBoardOpen)}
                >
                  + New Column
                </button>
            </>
          ) : null}
        </section>
      </main>
      {editBoardOpen 
      ? <EditBoard closeModal={() => setEditBoardOpen(false)} /> 
      : null}
    </>
  );
}

export default Board