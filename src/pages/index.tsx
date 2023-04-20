import { rootState } from '@/redux/reduxTypes'
import useBoardNames from '@/custom/boardNames/useBoardNames'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNameBoard } from '@/redux/nameBoard/actions'
import ViewTaskModal from '@/components/shared/ViewTaskModal'

const Home = () => {
  const dispatch = useDispatch()
  useBoardNames()
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const [DeleteTaskModalOpen, setDeleteTaskModalOpen] = useState<boolean>(false)
  const boardNames = useSelector((rootReducer: rootState) => rootReducer.boardSlice)

  useEffect(() => {
    if (localStorage.getItem("nameBoard")) {
      dispatch(setNameBoard(localStorage.getItem("nameBoard") as string))
    } else {
      localStorage.setItem("nameBoard", "Platform Launch")
    }
  },[])


  const [openViewTaskModal, setOpenViewTaskModal] = useState<boolean>()
  const [task, setTask] = useState<string>("")

  const handleOpenViewTaskModal = () => {
    setOpenViewTaskModal(!openViewTaskModal)
  }

  const handleTaskModalOpen = () => {
    setDeleteTaskModalOpen(!DeleteTaskModalOpen)
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
                <div className='flex flex-col gap-4'>

                  <h3 className={`font-bold uppercase tracking-wide text-xs/4 ${theme === "light" ? "text-_dark" : "text-_white"}`}>{col.name} ( {col.tasks ? col.tasks.length : 0 } )</h3>
                  
                  <ul key={index} style={{ height: "80vh" }} className={`flex flex-col gap-5 w-72 ${col?.tasks?.length === 0 || !col.tasks ? "rounded-md col-gradient" : ""}`}>

                    {

                      col?.tasks?.map((col, index) => (

                        <li  key={index} style={{ boxShadow: "0px 4px 6px rgba(54, 78, 126, 0.101545)" }} className={`rounded-lg ${theme === "light" ? "bg-_white" : "bg-dark_Gray"}`}>
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
          {
            openViewTaskModal ? <ViewTaskModal closeModal={handleOpenViewTaskModal} taskTarget={task}  /> : null
          }
        </section>     
      </main>
    </>
  )
}

export default Home