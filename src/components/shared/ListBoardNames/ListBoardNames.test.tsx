import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import ListBoardNames from "."
import { mockCloseModal } from "@/testUtils/mocks"
import { act } from "react-dom/test-utils"

const mockStore = configureMockStore()

describe("List Board Names Component", () => { 
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
        <ListBoardNames closeModal={mockCloseModal} />
      </Provider>
    )

  })

  it("should close mobile menu when button is clicked", async () => {

    render(
      <Provider store={store}>
        <ListBoardNames closeModal={mockCloseModal} />
      </Provider>
    )

    await act(async () => {
      const buttonNameBoard = await screen.findByTestId("btn-name-board-1")
  
      fireEvent.click(buttonNameBoard)
    })

    const actions = store.getActions()

    expect(actions).toEqual([
      {
        payload: "My Other Board",
        type: "setBoard/name",
      },
    ])

    expect(mockCloseModal).toBeCalled()

  })

})