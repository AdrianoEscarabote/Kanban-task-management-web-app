import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBoards } from "@/redux/board/reducer";

const useBoardData = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("board")) {
          const obj = JSON.parse(localStorage.getItem("board") as string)
          dispatch(setBoards(obj))
        } else {
          const response = await axios.get("data/data.json");
          // Calls the setBoards action to update the state in Redux with the received data
          dispatch(setBoards(response.data))
          localStorage.setItem("board", JSON.stringify(response.data))
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData()
  }, [])
}

export default useBoardData;