import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import AddBoardModal from "."

const mockStore = configureMockStore()

describe("Add Board Modal", () => {

  it("should render correctly", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store} >
        <AddBoardModal closeModal={() => {}} />
      </Provider>
    )

  })

})