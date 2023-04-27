import { createSelector } from "@reduxjs/toolkit";
import { rootState } from "../reduxTypes";

const selectBoardState = (state: rootState) => state.boardSlice

export const selectCheckboxCheckedCount = (taskName: string) => createSelector(
    [selectBoardState],
    (board) => board.boards.map(board => board.columns.map(col => col.tasks
      .filter(task => task.title === taskName) // filtrar a tarefa correta
      .map(task => task.subtasks.filter(item => item.isCompleted).length)))
)