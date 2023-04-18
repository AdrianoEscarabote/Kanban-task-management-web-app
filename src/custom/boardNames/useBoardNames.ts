import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBoards } from "@/redux/board/reducer";

const useBoardNames = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("data/data.json");
        // Chama a ação setBoards para atualizar o estado no Redux com os dados recebidos
        dispatch(setBoards(response.data))
      } catch (err) {
        console.log(err);
      }
    }
    console.log("entrei no use effect")

    fetchData()
  }, [])
}

export default useBoardNames;