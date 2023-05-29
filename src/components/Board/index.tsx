import { useSelector, useDispatch } from "react-redux";
import { rootState } from "@/redux/reduxTypes";
import { setNameBoard } from "../../redux/nameBoard/actions";
import useBoardData from "../../custom/boardData/useBoardData";
import { useEffect, useState } from "react";
import EditBoard from "../../modals/EditBoard/index";
import Column from "../../components/Column/index";
import Head from "next/head";
import Button from "../shared/Button";
import { useTheme } from "../../custom/theme/index";

const Board = () => {
  useTheme()
  useBoardData();
  const dispatch = useDispatch();
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

  const handleOpenEditBoardModal = () => {
    setEditBoardOpen(!editBoardOpen)
  }

  return (
    <>
      <Head>
        <title>Frontend Mentor | Kanban task management web app</title>
      </Head>
      <main className={`flex overflow-x-scroll relative top-24 gap-6 px-4 transition duration-0
      ${theme === "light" 
      ? "bg-almost_White" 
      : "bg-almost_Dark" }`}>
        {columns && columns.length > 0 ? (
          <section className='relative h-full w-full flex items-start gap-6 p-5 pb-0'>
            {columns.map((col, index) => {
              return <Column key={index} colIndex={index} />;
            })}
            <button 
              aria-label="edit board"
              style={{ height: "80vh", minWidth: "280px" }} 
              className={`
              ${theme === "light" 
              ? "col-gradient" 
              : "col-gradient-dark"} font-bold text-2xl/8 text-center text-_gray flex flex-col items-center justify-center gap-5 rounded-md relative top-8`}
              onClick={() => setEditBoardOpen(!editBoardOpen)}
              >
                + New Column
              </button>
          </section>
          ) : 
          <section className="relative h-full w-full flex justify-center items-center gap-6 p-5">
            <div className='flex flex-col self-center justify-center items-center gap-6 p-6'>
              <h2 className='font-bold text-lg/6 text-_gray'>This board is empty. Create a new column to get started.</h2>
              <div style={{ maxWidth: "174px", width: "100%" }}>
                <Button 
                  backgroundColor='#635FC7' 
                  label='+ Add New Column' 
                  size='small' 
                  textColor='#FFF' 
                  hover="#A8A4FF" 
                  onClick={handleOpenEditBoardModal}
                  />
              </div>
            </div>
          </section>
        }
      </main>
      {editBoardOpen 
      ? <EditBoard closeModal={() => setEditBoardOpen(false)} /> 
      : null}
    </>
  );
}

export default Board