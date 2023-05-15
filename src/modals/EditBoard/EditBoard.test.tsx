import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import EditBoard from "."

const mockStore = configureMockStore()

describe("Edit Board Modal", () => {

  it("should render correctly", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store}>
        <EditBoard closeModal={() => {}} />
      </Provider>
    )

  })

})