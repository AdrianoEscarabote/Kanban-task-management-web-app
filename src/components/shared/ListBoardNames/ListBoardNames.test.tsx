import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import ListBoardNames from "."

const mockStore = configureMockStore()

describe("List Board Names Component", () => {

  it("should render correctly", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store}>
        <ListBoardNames closeModal={() => {}} />
      </Provider>
    )

  })

})