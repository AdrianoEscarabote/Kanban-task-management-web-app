import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import ViewTaskModal from "."

const mockStore = configureMockStore()

describe("View Task Modal", () => {

  it("should render correctly", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store}>
        <ViewTaskModal closeModal={() => {}} openDeleteTaskModal={() => {}} openEditTaskModal={() => {}} taskTarget="Design settings and search pages" />
      </Provider>
    )

  })

})