import nameBoardTypes from "./action-types"

export const setNameBoard = (payload: string) => ({
  type: nameBoardTypes.setBoardName,
  payload: payload 
})