import { BoardDataType, ChangeStatusType, createNewBoardType, createNewTask, EditBoardType, NameToDelete, Task } from "./boardTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 

// estado inicial 
const initialState: BoardDataType = { boards: [] }

// cria o slice usando o createSlice
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    
    setBoards: (state, action: PayloadAction<BoardDataType>) => {
      state.boards = action.payload.boards;
    },

    createNewBoard: (state, action: PayloadAction<createNewBoardType>) => {
      const { name, columns } = action.payload;
      state.boards.push({ name: name, columns: columns })
    },

    deleteBoard: (state, action: PayloadAction<NameToDelete>) => {
      state.boards = state.boards.filter((board) => board.name !== action.payload.name)
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
    },
    addNewTask: (state, action: PayloadAction<createNewTask>) => {
      const { Task, nameColumn } = action.payload 
      
      state.boards = state.boards.map(board => {
        if (board.name === nameColumn) {
          board.columns.filter(col => col.name === Task.status ? col.tasks?.push(Task) : col)
        }
        return board
      })
    },
    changeStatus: (state, action: PayloadAction<ChangeStatusType>) => {
      const { boardName, name, status } = action.payload
      
      state.boards = state.boards.map(board => {

    

        if (board.name === boardName) {         
          
          const newColumns = board.columns.map(col => {
                        
            
           /* if (col.name !== status) {
              
              return {
                ...col,
                tasks: col.tasks?.filter(task => task.title !== name)
              }
            }  */
            
            if (col.name === status) {
              const newTasks = board.columns.map(collumn => collumn.tasks?.filter(tasks => tasks.title === name))[0]
              
              const obj = {
                title: newTasks[0].title,
                description: newTasks[0].description,
                status: newTasks[0].status,
                subtasks: newTasks[0].subtasks
              }
              return { 
                ...col, 
                tasks: [...col.tasks, obj]
              }

            }

            return col
          })
          return { ...board, columns: newColumns }
        }
        return board
      })
    },
  }
});

export const { changeStatus, setBoards, createNewBoard, deleteBoard, editBoard, deleteTask, addNewTask } = boardSlice.actions

export default boardSlice.reducer