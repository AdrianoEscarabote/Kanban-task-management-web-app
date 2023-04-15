import { rootState } from '@/components/Header/HeaderProps'
import useBoardNames from '@/custom/boardNames/useBoardNames'
import Head from 'next/head'
import { useSelector } from 'react-redux'

const Home = () => {
  const { theme } = useSelector((rootReducer: rootState) => rootReducer.themeReducer)
  const { boardNames } = useBoardNames()

  return (
    <>
      <Head>
        <title>Frontend Mentor | Kanban task management web app</title>
      </Head>
      <main className={`flex flex-col items-center overflow-x-scroll justify-between ${theme === "light" ? "bg-almost_White" : "bg-almost_Dark" }`}>

      <section className='flex items-start gap-6 p-6'>
        {
          boardNames.boards.map((board) => (
            board.columns.map((col) => (
              <ul className='flex flex-col gap-5'>
                {
                  col.tasks.map((task) => (
                    <li style={{ boxShadow: "0px 4px 6px rgba(54, 78, 126, 0.101545)" }} className={`rounded-lg w-72 min-h-20 ${theme === "light" ? "bg-_white" : "bg-dark_Gray"} px-4 py-5`}>
                      <h4 className={`font-bold text-base/5 ${theme === "light" ? "text-_dark" : "text-_white"}`}>{task.title}</h4>
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