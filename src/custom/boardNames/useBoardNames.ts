import { useEffect, useState } from "react";
import { BoardDataType } from "./boardNames";
import axios from "axios";

const useBoardNames = () => {
  const [boardNames, setBoardNames] = useState<BoardDataType>({ boards: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("data/data.json");
        setBoardNames(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData()
  }, [])

  return { boardNames }
}

export default useBoardNames;