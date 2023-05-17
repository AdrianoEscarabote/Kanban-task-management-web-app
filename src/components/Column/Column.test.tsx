import configureMockStore from 'redux-mock-store';
import getMockState from "@/testUtils/getMockState";
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Column from '.';

const mockStore = configureMockStore();

describe("Column Component", () => {

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
        <Column key={1} colIndex={0} />
      </Provider>
    )

    const ul = screen.getByRole("list")

    expect(ul).toBeInTheDocument()

  })

})