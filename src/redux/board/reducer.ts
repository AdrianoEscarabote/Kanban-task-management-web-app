import { couldStartTrivia } from "typescript";
import { BoardDataType, ChangeRadioChecked, ChangeStatusType, createNewBoardType, createNewTask, DragTaskTypes, EditBoardType, EditTaskType, NameToDelete } from "./boardTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import { setNameBoard } from "../nameBoard/actions";

// initial state
const initialState: BoardDataType = { boards: [] }

// create the slice using createSlice
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    
    setBoards: (state, action: PayloadAction<BoardDataType>) => {
      state.boards = action.payload.boards;
    },

    createNewBoard: (state, action: PayloadAction<createNewBoardType>) => {
      const { name, columns } = action.payload;
      if (state.boards.filter(board => board.name === name).length === 0) {
        state.boards.push({ name: name, columns: columns })
        localStorage.setItem("board", JSON.stringify(state))
      } else {
        return {
          ...state
        }
      }
    },

    deleteBoard: (state, action: PayloadAction<NameToDelete>) => {
      state.boards = state.boards.filter((board) => board.name !== action.payload.name)
      localStorage.setItem("board", JSON.stringify(state))
    },

    deleteTask: (state, action: PayloadAction<NameToDelete>) => {
      const { name } = action.payload
      state.boards = state.boards.map((board) => {
        const newColumns = board.columns.map((col) => {
          if (!col.tasks) return col;

          const newTasks = col.tasks.filter((task) => task.title !== name)

          return {
            ...col,
            tasks: newTasks.length ? newTasks : []
          }
        })

        return {
          ...board,
          columns: newColumns
        }
      })
      localStorage.setItem("board", JSON.stringify(state))
    },

    changeCheckboxChecked: (state, action: PayloadAction<ChangeRadioChecked>) => {
      const { isCompleted, title } = action.payload

      state.boards = state.boards.map(board => {
        return {
          ...board,
          columns: board.columns.map(col => {
            return {
              ...col,
              tasks: col.tasks.map(task => {
                return {
                  ...task,
                  subtasks: task.subtasks.map(sub => {
                    if (sub.title === title) {
                      return {
                        ...sub,
                        isCompleted: isCompleted
                      }
                    } else {
                      return sub
                    }
                  })
                }
              })
            }
          })
        }
      })
      localStorage.setItem("board", JSON.stringify(state))
    },

    editBoard: (state, action: PayloadAction<EditBoardType>) => {

      const { nameBoard, nameToAdd, boards } = action.payload

      state.boards = state.boards.map(board => {
        if (board.name === nameBoard) {
          return {
            ...board,
            name: nameToAdd,
            columns: boards.map(newBoard => {
              const existingColumn = board.columns.find(col => col.name === newBoard.name)

              if (existingColumn){
                return { 
                  ...existingColumn,
                  name: newBoard.name
                 }
              } else {
                return { ...board, name: newBoard.name, tasks: [] }
              }      
               
            })
          }
        }
        return board
      })
      localStorage.setItem("board", JSON.stringify(state))
    },
    addNewTask: (state, action: PayloadAction<createNewTask>) => {
      const { Task, nameColumn } = action.payload 
      
      state.boards = state.boards.map(board => {
        if (board.name === nameColumn) {
          board.columns.filter(col => col.name === Task.status ? col.tasks?.push(Task) : col)
        }
        return board
      })
      localStorage.setItem("board", JSON.stringify(state))
    },
    changeStatus: (state, action: PayloadAction<ChangeStatusType>) => {
      const { boardName, name, status, description, subtasks } = action.payload

      state.boards = state.boards.map(board => {
        if (board.name === boardName) {
          const newColumns = board.columns.map(column => {
            if (column.name !== status) {
              return {
                ...column,
                tasks: column.tasks.filter(task => task.title !== name)
              }
            } 
            const targetColumn = board.columns.filter(col => col.name === status)[0]

            if (targetColumn) {

              if (!targetColumn.tasks.some(task => task.title === name)) {
                const obj = {
                  title: name,
                  description: description,
                  status: status,
                  subtasks: subtasks
                }
                return { 
                  ...column, 
                  tasks: [...column.tasks, obj]
                }
              } else {
                return column
              }
              
            }
            return column
          })
          return { ...board, columns: newColumns }
        }
        return board
      })     
      localStorage.setItem("board", JSON.stringify(state)) 
    },
    EditTask: (state, action: PayloadAction<EditTaskType>) => {
      const { description, status, subtasks, title, oldName } = action.payload
      console.log(action.payload)
      state.boards = state.boards.map(board => {
        return {
          ...board,
          columns: board.columns.map(col => {
            return {
              ...col,
              tasks: col.tasks.map(task => {
                if (task.title === oldName) {
                  return {
                    ...task,
                    title: title,
                    description: description,
                    status: status,
                    subtasks: subtasks,
                  }
                } else {
                  return task
                }
              })
            }
          })
        }
      })
      localStorage.setItem("board", JSON.stringify(state))
    },
    dragTask: (state, action: PayloadAction<DragTaskTypes>) => {
      const { currentColIndex, prevColIndex, taskIndex, boardName } = action.payload

      state.boards = state.boards.map(board => {
        if (board.name === boardName) {
          // column the task is in!
          const currentColumn = board.columns.find((col, index) => index === currentColIndex)

          if (currentColumn) {
            
            // removes the task from the column and returns
            const task = currentColumn.tasks.splice(taskIndex, 1)[0]

            const prevColumn = board.columns.find((col, index) => index === prevColIndex)

            // if the new column is true, I will add the task!
            if (prevColumn){
              const { description, subtasks, title } = task
              prevColumn.tasks.push({ description, subtasks, title, status: prevColumn.name })
            }
          }
        }
        return board
      })
      localStorage.setItem("board", JSON.stringify(state))
    }
  }
});

export const { dragTask, EditTask, changeCheckboxChecked, changeStatus, setBoards, createNewBoard, deleteBoard, editBoard, deleteTask, addNewTask } = boardSlice.actions

export default boardSlice.reducer