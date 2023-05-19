import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import ViewTaskModal from "."
import { mockCloseModal, mockOpenDeleteTaskModal, mockOpenEditTaskModal } from "@/testUtils/mocks"

const mockStore = configureMockStore()

describe("View Task Modal", () => {
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
        <ViewTaskModal 
          closeModal={mockCloseModal} 
          openDeleteTaskModal={mockOpenDeleteTaskModal} 
          openEditTaskModal={mockOpenEditTaskModal} 
          taskTarget="Design settings and search pages" 
        />
      </Provider>
    )

  })


  it("should mark the input checkbox correctly and dispatch the action to redux", () => {

    render(
      <Provider store={store}>
        <ViewTaskModal 
          taskTarget="Design settings and search pages" 
          closeModal={mockCloseModal} 
          openDeleteTaskModal={mockOpenDeleteTaskModal} 
          openEditTaskModal={mockOpenEditTaskModal} 
        />
      </Provider>
    )

    // Encontrar o input checkbox pelo título
    const input = screen.getByRole("checkbox");

    fireEvent.click(input)

    // Verify that the changeCheckboxChecked action was dispatched correctly
    const actions = store.getActions();
  
    expect(actions).toEqual(
      [
        { 
          payload: { 
            isCompleted: false,
            title: "Settings - Account page", 
          },
          type: "board/changeCheckboxChecked" ,
        }
      ]
    )
      
  })

  it("should dispatch the action to change the task place when changing the select", () => {

    render(
      <Provider store={store}>
        <ViewTaskModal 
          taskTarget="Design settings and search pages" 
          closeModal={mockCloseModal} 
          openDeleteTaskModal={mockOpenDeleteTaskModal} 
          openEditTaskModal={mockOpenEditTaskModal} 
        />
      </Provider>
    )

    // Encontrar o select
    const selectElement = screen.getByRole('combobox');

    // evento
    fireEvent.change(selectElement, { target: { value: 'Done' } });
    expect(selectElement).toHaveValue("Done")
    
    const buttonToSaveChanges = screen.getByText("Save")
    
    fireEvent.click(buttonToSaveChanges)

    // Verify that the deleteBoard action was dispatched correctly
    const actions = store.getActions();
    
    expect(actions).toEqual(
        [
          { 
            type: "board/changeStatus", 
            payload: { 
              boardName: "My Board", 
              description: "", 
              name: "Design settings and search pages", 
              status: "Done",
              subtasks: [
                {
                  title: "Settings - Account page",
                  isCompleted: true
                },
              ]
            } 
          },
        ]
      )
  })

})