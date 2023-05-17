import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import ListBoardNames from "."
import { mockCloseModal } from "@/testUtils/mocks"

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

})