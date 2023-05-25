import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBoards } from "../../redux/board/reducer";
import { setNameBoard } from "../../redux/nameBoard/actions";

const useBoardData = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("board")) {
          const obj = JSON.parse(localStorage.getItem("board") as string)
          dispatch(setBoards(obj))
          setLoading(false)
        } else {
          const response = await axios.get("data/data.json");
          // Calls the setBoards action to update the state in Redux with the received data
          dispatch(setBoards(response.data))
          localStorage.setItem("board", JSON.stringify(response.data))
          dispatch(setNameBoard(response.data.boards[0].name))
          setLoading(false)
        }
      } catch (err) {
        return null
      }
    }

    fetchData()
  }, [])
  return { loading } 
}

export default useBoardData;