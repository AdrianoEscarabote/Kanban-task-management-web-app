import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import DeleteModal from "."

const mockStore = configureMockStore()

describe("Delete Board Component", () => {

  it("should render correctly", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store}>
        <DeleteModal NameToDelete="Design settings and search pages"  closeModal={() => {}} />
      </Provider>
    )

  })

})