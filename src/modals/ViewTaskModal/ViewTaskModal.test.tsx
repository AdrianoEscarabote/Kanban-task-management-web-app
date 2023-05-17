import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import ViewTaskModal from "."

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
        <ViewTaskModal closeModal={() => {}} openDeleteTaskModal={() => {}} openEditTaskModal={() => {}} taskTarget="Design settings and search pages" />
      </Provider>
    )

  })

})