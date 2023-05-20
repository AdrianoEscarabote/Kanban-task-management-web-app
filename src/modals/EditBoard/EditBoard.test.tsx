import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import EditBoard from "."
import { mockCloseModal } from "@/testUtils/mocks"
import { act } from "react-dom/test-utils"

const mockStore = configureMockStore()

describe("Edit Board Modal", () => {
  let store: any;

  beforeEach(() => {
    const mockState = getMockState()
    const state = mockStore(mockState)

    store = state
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should close modal on click outside the content", async () => {

    render(
      <Provider store={store}>
        <EditBoard closeModal={mockCloseModal} />
      </Provider>
    );

    await act(async () => {
      const modal = screen.getByTestId("modal")
      fireEvent.click(modal)
    })

    expect(mockCloseModal).toBeCalled()
    
  })

  it("should submit the form correctly and dispatch the action to redux", async () => {

    render(
      <Provider store={store}>
        <EditBoard closeModal={mockCloseModal} />
      </Provider>
    );

    await act(async () => {
      const buttonSubmit = screen.getByText("Save Changes")
      fireEvent.click(buttonSubmit)
    })

    const actions = store.getActions()

    expect(actions).toEqual([
      {
        type: "setBoard/name",
        payload: "My Board",
      },
      {
        type: "board/editBoard",
        payload: {
          nameToAdd: "My Board",
          nameBoard: "My Board",
          boards: [
            { name: "Todo" },
            { name: "Done" },
          ],
        },
      },
    ]);
  })
})