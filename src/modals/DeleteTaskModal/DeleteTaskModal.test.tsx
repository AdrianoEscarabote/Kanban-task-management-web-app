import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import DeleteTaskModal from "."
import { mockCloseModal } from "@/testUtils/mocks"

const mockStore = configureMockStore()

describe("Delete Task Modal", () => {

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
        <DeleteTaskModal NameToDelete="Design settings and search pages" closeModal={mockCloseModal}/>
      </Provider>
    )
    
  })

  it("should call handleClickDeleteTask and dispatch deleteTask action when delete button is clicked", () => {
    render(
      <Provider store={store}>
        <DeleteTaskModal NameToDelete="Design settings and search pages" closeModal={mockCloseModal} />
      </Provider>
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockCloseModal).toHaveBeenCalled();

    // Verify that the deleteTask action was dispatched correctly
    const actions = store.getActions();

    expect(actions).toEqual([
      { type: "board/deleteTask", payload: { name: "Design settings and search pages" } },
    ]);

  });

  it("should call functions when button cancel is clicked", () => {

    render(
      <Provider store={store}>
        <DeleteTaskModal NameToDelete="Design settings and search pages" closeModal={mockCloseModal} />
      </Provider>
    )    

    const buttonCancel = screen.getByText("Cancel")

    fireEvent.click(buttonCancel)

    expect(mockCloseModal).toBeCalled()

  })

})