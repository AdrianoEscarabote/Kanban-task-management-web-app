import Head from "next/head";
import Board from "@/components/Board";
import Layout from "@/components/Layout";
import useBoardData from "@/custom/boardData/useBoardData";
import Preloader from "@/components/preloader";

const Home = () => {
  const { loading } = useBoardData()

  return (
    <>
      <Head>
        <title>Frontend Mentor | Kanban task management web app</title>
      </Head>    
      {
        loading 
        ? <Preloader />
        :  
        <Layout>
          <Board />
        </Layout>
      }   
    </>
  );
}

export default Home