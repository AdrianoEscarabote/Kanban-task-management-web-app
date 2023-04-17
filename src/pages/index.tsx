import { rootState } from '@/redux/reduxTypes'
import useBoardNames from '@/custom/boardNames/useBoardNames'
import Head from 'next/head'
import { useSelector } from 'react-redux'

const Home = () => {

  useBoardNames()
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const { nameBoard } = useSelector((rootReducer: rootState) => rootReducer.reducerNameBoard)
  const boardNames = useSelector((rootReducer: rootState) => rootReducer.boardSlice)

  return (
    <>
      <Head>
        <title>Frontend Mentor | Kanban task management web app</title>
      </Head>
      <main className={`transition min-h-screen pt-20 duration-0 flex flex-col items-start overflow-x-scroll justify-between ${theme === "light" ? "bg-almost_White" : "bg-almost_Dark" }`}>
        <section className='flex items-start gap-6 p-6'>
          {
            boardNames.boards.filter((board) => board.name === (!nameBoard ? boardNames.boards[0].name : nameBoard)).map((board) => (
              board.columns.map((col, index) => (
                <ul key={index} className='flex flex-col gap-5'>
                  <h3 className={`font-bold uppercase tracking-wide text-xs/4 ${theme === "light" ? "text-_dark" : "text-_white"}`}>{col.name} ( {col.tasks.length} )</h3>
                  {
                    col.tasks.map((col, index) => (
                      <li key={index} style={{ boxShadow: "0px 4px 6px rgba(54, 78, 126, 0.101545)" }} className={`rounded-lg w-72 min-h-20 ${theme === "light" ? "bg-_white" : "bg-dark_Gray"} px-4 py-5`}>
                        <h4 className={`font-bold text-base/5 ${theme === "light" ? "text-_dark" : "text-_white"}`}>{col.title}</h4>
                      </li>
                    ))
                  }
                </ul>
              ))
            ))        
          }
        </section>     
      </main>
    </>
  )
}

export default Home