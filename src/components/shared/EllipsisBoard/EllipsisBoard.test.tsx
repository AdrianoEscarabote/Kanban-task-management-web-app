import getMockState from "@/testUtils/getMockState"
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store'; 
import Ellipsis from ".";

const mockStore = configureMockStore()

describe("Ellipsis Board Component", () => {

  it("should render correctly", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store} >
        <Ellipsis />
      </Provider>
    )

  })

})