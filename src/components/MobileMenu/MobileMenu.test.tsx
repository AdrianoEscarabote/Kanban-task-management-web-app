import getMockState from "@/testUtils/getMockState"
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import MobileMenu from ".";

const mockStore = configureMockStore();

describe("Mobile Menu Component", () => {
  let store: any;

  beforeEach(() => {
    const mockState = getMockState()
    const state = mockStore(mockState)
  
    store = state
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it("should render correctly", () => {

    render(
      <Provider store={store}>
        <MobileMenu handleModal={() => {}} />
      </Provider>
    )

  })

})