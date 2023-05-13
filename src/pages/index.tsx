import Head from "next/head";
import Board from "@/components/Board";

const Home = () => {

  return (
    <>
      <Head>
        <title>Frontend Mentor | Kanban task management web app</title>
      </Head>
      <Board />
    </>
  );
}

export default Home