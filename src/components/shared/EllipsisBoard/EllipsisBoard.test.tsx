import getMockState from "@/testUtils/getMockState"
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store'; 
import Ellipsis from ".";

const mockStore = configureMockStore()

describe("Ellipsis Board Component", () => {
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
      <Provider store={store} >
        <Ellipsis />
      </Provider>
    )

  })

})