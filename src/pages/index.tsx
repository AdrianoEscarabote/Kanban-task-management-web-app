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
import style from "../styles/style.module.css"
import Button from '@/components/shared/Button'
import EditTaskModal from '@/components/shared/EditTaskModal'

const Home = () => {
  const dispatch = useDispatch()
  useBoardNames()
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const boardNames = useSelector((rootReducer: rootState) => rootReducer.boardSlice)
  const [task, setTask] = useState<string>("")
  const [editBoardOpen, setEditBoardOpen] = useState<boolean>(false)
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState<boolean>(false)
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState<boolean>(false)
  const [editTaskModalOpen, setEditTaskModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem("nameBoard")) {
      dispatch(setNameBoard(localStorage.getItem("nameBoard") as string))
    } else {
      localStorage.setItem("nameBoard", "Platform Launch")
    }
  },[])
  
  useEffect(() => {
    if (theme === "light") {
      document.querySelector("body")?.classList.add("body_light")
      document.querySelector("body")?.classList.remove("body_dark")
    } else {
      document.querySelector("body")?.classList.add("body_dark")
      document.querySelector("body")?.classList.remove("body_light")
    }
  }, [theme])

  // edit board open
  const handleOpenEditBoardModal = () => {
    setEditBoardOpen(!editBoardOpen)
  }
  // view task modal open
  const handleOpenViewTaskModal = () => {
    setViewTaskModalOpen(!viewTaskModalOpen)
  }

  return (
    <>
      <Head>
        <title>Frontend Mentor | Kanban task management web app</title>
      </Head>
      <>
        {            
          boardNames.boards
          .filter((board) => board.name === (!nameBoard ? boardNames.boards[0].name : nameBoard))
          .map((board) => (
            board &&
            board.columns.length !== 0 ?
            <main className={`transition min-h-screen overflow-y-scroll pt-20 duration-0 flex flex-col items-start justify-between ${theme === "light" ? "bg-almost_White" : "bg-almost_Dark" }`}>
              <section className='h-full flex items-start gap-6 p-5'>
                {
                  board.columns.map((col, index) => (
                    <div className='flex flex-col gap-4 h-full' key={index}>
                      <h3 
                      className={`font-bold z-10 uppercase tracking-wide text-xs/4 
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
                      <ul key={index} className={`flex h-full flex-col gap-5 w-72 rounded-md ${col?.tasks?.length === 0 || !col.tasks ? theme === "light" ? "col-gradient" : "col-gradient-dark" : "" }`}>
                        {
                          col?.tasks?.map((col, index) => (
                            <li key={index} style={{ boxShadow: "0px 4px 6px rgba(54, 78, 126, 0.101545)" }} className={`rounded-lg ${theme === "light" ? "bg-_white" : "bg-dark_Gray"}`}>
                              <button className={`px-4 py-5 w-72 min-h-20 flex flex-col flex-start justify-start`} onClick={() => {
                                handleOpenViewTaskModal()
                                setTask(col.title)
                              }}>
                                <div className="flex flex-col gap-2">
                                  <p className={`text-start font-bold text-base/5 ${theme === "light" ? "text-_dark" : "text-_white"}`}>{col.title}</p>
                                  {
                                    col.subtasks.length > 0 ? <span className={`text-_gray font-bold text-xs self-start`}>{col.subtasks.filter(sub => sub.isCompleted).length} of {col.subtasks.length} subtasks</span> : null 
                                  }
                                </div>
                              </button>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  ))
                }
                <button 
                  style={{ height: "80vh" }} 
                  className={`${theme === "light" ? "col-gradient" : "col-gradient-dark"} font-bold text-2xl/8 text-center text-_gray flex flex-col items-center justify-center gap-5 w-72 rounded-md relative top-8`}
                  onClick={handleOpenEditBoardModal}
                >
                  + New Column
                </button>
              </section>
            </main>
            : <main className={`transition min-h-screen pt-20 duration-0 flex flex-col items-center justify-center ${theme === "light" ? "bg-almost_White" : "bg-almost_Dark" }`}>
                <section className='flex flex-col justify-center items-center gap-6 p-6'>
                  <h2 className='font-bold text-lg/6 text-_gray'>This board is empty. Create a new column to get started.</h2>
                  <div style={{ maxWidth: "174px", width: "100%" }}>
                    <Button 
                      backgroundColor='#635FC7' 
                      label='+ Add New Column' 
                      size='small' 
                      textColor='#FFF' 
                      hover={style.hover_purpleLight} 
                      onClick={handleOpenEditBoardModal}
                      />
                  </div>
                </section>
              </main> 
          ))   
        }
        {
          editBoardOpen ? <EditBoard closeModal={() => setEditBoardOpen(false)} /> : null
        }
        {
          viewTaskModalOpen ? <ViewTaskModal taskTarget={task} openDeleteTaskModal={() => setDeleteTaskModalOpen(!deleteTaskModalOpen)} openEditTaskModal={() => setEditTaskModalOpen(!editTaskModalOpen)} closeModal={() => setViewTaskModalOpen(false)} /> : null
        }
        { 
          deleteTaskModalOpen ? <DeleteTaskModal NameToDelete={task} closeModal={() => setDeleteTaskModalOpen(!deleteTaskModalOpen)} /> : null 
        }
        {
          editTaskModalOpen ? <EditTaskModal task={task} closeModal={() => setEditTaskModalOpen(!editTaskModalOpen)} />  : null
        }           
      </>
    </>
  );
};

export default Home;