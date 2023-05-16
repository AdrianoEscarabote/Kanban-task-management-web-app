import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBoards } from "../../redux/board/reducer";
import { setNameBoard } from "../../redux/nameBoard/actions";

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
          dispatch(setNameBoard(response.data.boards[0].name))
        }
      } catch (err) {
        return null
      }
    }

    fetchData()
  }, [])
}

export default useBoardData;