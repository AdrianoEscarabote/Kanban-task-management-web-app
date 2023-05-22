import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import AddTaskModal from "./index"
import { mockCloseModal } from "@/testUtils/mocks"
import { addNewTask } from "@/redux/board/reducer"

const mockStore = configureMockStore()

describe("Add Task Modal", () => {
  let store: any;

  beforeEach(() => {
    const mockState = getMockState()
    const state = mockStore(mockState)

    store = state
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should render correctly", () => {

    render(
      <Provider store={store}>
        <AddTaskModal closeModal={mockCloseModal} />
      </Provider>  
    )

  })

  it("should submit the form correctly and dispatch the action to redux", async () => {

    render(
      <Provider store={store}>
        <AddTaskModal closeModal={mockCloseModal} />
      </Provider>   
    )
    
    // input title
    const titleInput = screen.getByTestId("title") as HTMLInputElement
    fireEvent.change(titleInput, { target: { value: "Task Title" } })
    
    // subtask 1
    const subtaskInput1 = screen.getByTestId("subtask-1") as HTMLInputElement
    fireEvent.change(subtaskInput1, { target: { value: "subtask1" } })
    
    // subtask 2
    const subtaskInput2 = screen.getByTestId("subtask-2") as HTMLInputElement
    fireEvent.change(subtaskInput2, { target: { value: "subtask2" } })
    
    // select
    const selectElement = screen.getByTestId('select') as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: 'Todo' } });
    
    const actions = store.getActions()

    // simulating the behavior of the component

    store.dispatch(addNewTask({
      nameColumn: "My Board",
      Task: {
        title: titleInput.value as string,
        description: "",
        status: selectElement.value as string,
        subtasks: [
          {
            title: subtaskInput1.value as string,
            isCompleted: false,
          },
          {
            title: subtaskInput2.value as string,
            isCompleted: false,
          },
        ] 
      }
    }))
    
    expect(actions).toEqual([
      {
        type: "board/addNewTask",
        payload: {
          nameColumn: "My Board",
          Task: {
            title: "Task Title",
            description: "",
            status: "Todo",
            subtasks: [
              {
                title: "subtask1",
                isCompleted: false
              },
              {
                title: "subtask2",
                isCompleted: false
              }
            ]
          }
        }
      }
    ]);

  });

})