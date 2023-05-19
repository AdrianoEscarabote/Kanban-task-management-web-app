import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import DeleteModal from "."
import { mockCloseModal } from "@/testUtils/mocks"

const mockStore = configureMockStore()

describe("Delete Board Component", () => {
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
        <DeleteModal NameToDelete="Design settings and search pages"  closeModal={mockCloseModal} />
      </Provider>
    )

  })

  it("should call functions when button cancel is clicked", () => {

    render(
      <Provider store={store}>
        <DeleteModal NameToDelete="My Board" closeModal={mockCloseModal} />
      </Provider>
    )

    const buttonCancel = screen.getByText(/cancel/i)

    fireEvent.click(buttonCancel)

    expect(mockCloseModal).toBeCalled()

  })

  it("should call handleDeleteBoard and dispatch deleteBoard action when delete button is clicked", () => {

    render(
      <Provider store={store}>
        <DeleteModal NameToDelete="My Board" closeModal={mockCloseModal} />
      </Provider>
    )

    const buttonDelete = screen.getByText("Delete")

    fireEvent.click(buttonDelete)

    // Verify that the deleteBoard action was dispatched correctly
    const actions = store.getActions();

    expect(actions).toEqual([
      { type: "board/deleteBoard", payload: { name: "My Board" } },
      {  type: "setBoard/name", payload: "My Other Board" },
    ])

  })

})