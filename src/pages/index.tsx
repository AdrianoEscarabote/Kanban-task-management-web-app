import { rootState } from '@/redux/reduxTypes'
import useBoardNames from '@/custom/boardNames/useBoardNames'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNameBoard } from '@/redux/nameBoard/actions'
import ViewTaskModal from '@/components/shared/ViewTaskModal'
import EditBoard from '@/components/shared/EditBoard'
import DeleteTaskModal from '@/components/shared/DeleteTaskModal'

const Home = () => {
  const dispatch = useDispatch()
  useBoardNames()
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const boardNames = useSelector((rootReducer: rootState) => rootReducer.boardSlice)

  useEffect(() => {
    if (localStorage.getItem("nameBoard")) {
      dispatch(setNameBoard(localStorage.getItem("nameBoard") as string))
    } else {
      localStorage.setItem("nameBoard", "Platform Launch")
    }
  },[])


  const [task, setTask] = useState<string>("")


  const [editBoardOpen, setEditBoardOpen] = useState<boolean>(false)
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState<boolean>(false)
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState<boolean>(false)

  // edit board open
  const handleOpenEditBoardModal = () => {
    setEditBoardOpen(!editBoardOpen)
  }
  // view task modal open
  const handleOpenViewTaskModal = () => {
    setViewTaskModalOpen(!viewTaskModalOpen)
  }

  // delete task modal open
  const handleTaskModalOpen = () => {
    setDeleteTaskModalOpen(!deleteTaskModalOpen)
  }

  return (
    <>
      <Head>
        <title>Frontend Mentor | Kanban task management web app</title>
      </Head>
      <main className={`transition min-h-screen pt-20 duration-0 flex flex-col items-start overflow-x-scroll justify-between ${theme === "light" ? "bg-almost_White" : "bg-almost_Dark" }`}>
        <section className='flex items-start gap-6 p-6'>
          {
            boardNames.boards
            .filter((board) => board.name === (!nameBoard ? boardNames.boards[0].name : nameBoard))
            .map((board) => (
              board &&
              board.columns.map((col, index) => (
                <div className='flex flex-col gap-4' key={index}>

                  <h3 
                  className={`font-bold uppercase tracking-wide text-xs/4 
                  ${theme === "light" 
                  ? "text-_dark" 
                  : "text-_white"} 
                  ${col.name === "Todo" 
                  ? "todo pl-6 relative" 
                  : ""}
                  ${col.name === "Doing" 
                  ? "doing pl-6 relative"
                  : ""}
                  ${col.name === "Done" 
                  ? "done relative pl-6"
                  : ""}
                  `}>{col.name} ( {col.tasks ? col.tasks.length : 0 } )</h3>
                  
                  <ul key={index} style={{ height: "80vh" }} className={`flex flex-col gap-5 w-72 rounded-md ${col?.tasks?.length === 0 || !col.tasks ? theme === "light" ? "col-gradient" : "col-gradient-dark" : "" }`}>

                    {

                      col?.tasks?.map((col, index) => (

                        <li key={index} style={{ boxShadow: "0px 4px 6px rgba(54, 78, 126, 0.101545)" }} className={`rounded-lg ${theme === "light" ? "bg-_white" : "bg-dark_Gray"}`}>
                          <button className={`px-4 py-5 w-72 min-h-20 flex flex-start`} onClick={() => {
                            handleOpenViewTaskModal()
                            setTask(col.title)
                          }}>
                            <p className={`font-bold text-base/5 ${theme === "light" ? "text-_dark" : "text-_white"}`}>{col.title}</p>
                          </button>
                        </li>

                      ))

                    }
                  </ul>
                </div>

              ))
            )) 
          }
          <button 
            style={{ height: "80vh" }} 
            className={`${theme === "light" ? "col-gradient" : "col-gradient-dark"} font-bold text-2xl/8 text-center text-_gray flex flex-col items-center justify-center gap-5 w-72 rounded-md relative top-8`}
            onClick={handleOpenEditBoardModal}
          >
            + New Column
          </button>
          {
            editBoardOpen ? <EditBoard closeModal={() => setEditBoardOpen(false)} /> : null
          }

          {
            viewTaskModalOpen ? <ViewTaskModal taskTarget={task} closeElipsis={() => setDeleteTaskModalOpen(!deleteTaskModalOpen)} closeModal={() => setViewTaskModalOpen(false)} /> : null
          }

          { 
            deleteTaskModalOpen ? <DeleteTaskModal NameToDelete={task} closeModal={() => setDeleteTaskModalOpen(!deleteTaskModalOpen)} /> : null 
          }

        </section>     
      </main>
    </>
  )
}

export default Home