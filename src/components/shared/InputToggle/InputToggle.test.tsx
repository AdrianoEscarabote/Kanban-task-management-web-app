import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import InputToggle from "."

const mockStore = configureMockStore()

describe("Input Toggle Component", () => {
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
        <InputToggle />
      </Provider>
    )

  })
  
  it("should dispatch redux action and change theme", () => {

    render(
      <Provider store={store}>
        <InputToggle />
      </Provider>
    )

    const toggleBtn = screen.getByTestId("toggleBtn")

    fireEvent.click(toggleBtn)

    const actions = store.getActions()

    expect(actions).toEqual([
      {
        payload: "light",
        type: "theme/light",
      },
    ])

  })

})