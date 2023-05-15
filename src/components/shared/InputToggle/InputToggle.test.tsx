import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

const mockStore = configureMockStore()

describe("Input Toggle Component", () => {

  it("should render correctly", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store}>

      </Provider>
    )

  })

})