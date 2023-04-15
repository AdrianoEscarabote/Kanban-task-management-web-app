import useBoardNames from "@/custom/boardNames/useBoardNames";
import Image from "next/image";

const ListBoardNames = () => {
  const { boardNames } = useBoardNames()

  return (
    <section className="pl-5 py-3">
      <p className="text-_gray font-bold text-xs">ALL BOARDS ( {boardNames.boards.length} )</p>    
      <ul className="flex items-start flex-col gap-2 mt-4 font-bold text-sm/5 text-_gray">
          {
            boardNames.boards.map((board, index) => (
              <li className="flex items-center gap-4 h-12" key={index}>
                <Image src="/assets/icon-board.svg" height="16" alt="" width="16" />
                {board.name}
              </li>
            ))
          }
      </ul>
    </section>
  )
};

export default ListBoardNames;