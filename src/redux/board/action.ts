import boardTypes from "./action-types"
import { PayloadNewBoadTypes } from "./boardTypes"

export const CreateNewBoard = (payload: PayloadNewBoadTypes) => ({
  type: boardTypes.createNewBoard,
  payload: payload
})