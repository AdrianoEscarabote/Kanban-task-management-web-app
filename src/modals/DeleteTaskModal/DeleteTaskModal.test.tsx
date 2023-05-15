import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import DeleteTaskModal from "."

const mockStore = configureMockStore()

describe("Delete Task Modal", () => {

  it("should render correctly", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store}> 
        <DeleteTaskModal  NameToDelete="Design settings and search pages" closeModal={() => {}}/>
      </Provider>
    )

  })

})