import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { fireEvent, render, screen, act } from "@testing-library/react"
import { Provider } from "react-redux"
import AddBoardModal from "."
import { mockCloseModal } from "../../testUtils/mocks"

const mockStore = configureMockStore()

describe("Add Board Modal", () => {
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
      <Provider store={store} >
        <AddBoardModal closeModal={mockCloseModal} />
      </Provider>
    )
  })

  it("should close modal on click outside the content", async () => {

    render(
      <Provider store={store} >
        <AddBoardModal closeModal={mockCloseModal} />
      </Provider>
    )

    await act(async () => {
      const modal = screen.getByTestId("modal")
      fireEvent.click(modal, "{esc}");
    })

    expect(mockCloseModal).toBeCalled();

  })

  it("should submit form correctly", async () => {

    render(
      <Provider store={store}>
        <AddBoardModal closeModal={mockCloseModal} />
      </Provider>
    )
    
    await act(async () => { 
      // inputs
      const nameInput = screen.getByTestId("inputName");
      const column1 = screen.getByTestId("column-1")
      const column2 = screen.getByTestId("column-2")
      
      const submitButton = screen.getByLabelText(/create new board/i);
      
      // changing value
      fireEvent.change(nameInput, { target: { value: "My Board" } });
      fireEvent.click(submitButton);
      
      expect(nameInput).toHaveValue("My Board")
      expect(column1).toHaveValue("Todo")
      expect(column2).toHaveValue("Doing")
    });
    
    const actions = store.getActions()

    expect(actions).toEqual([
      {
        type: "board/createNewBoard",
        payload: {
          name: "My Board",
          columns: [
            { name: "Todo", tasks: [] },
            { name: "Doing", tasks: [] }
          ]
        }
      },
      {
        type: "setBoard/name",
        payload: "My Board"
      }
    ])
    
    expect(mockCloseModal).toBeCalled();

  })

})