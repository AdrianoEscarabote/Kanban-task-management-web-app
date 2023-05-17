import configureMockStore from 'redux-mock-store'; 
import getMockState from '@/testUtils/getMockState';
import { Provider } from 'react-redux';
import SidebarDesktop from '.';
import { render } from '@testing-library/react';

const mockStore = configureMockStore();

describe("Sidebar Component", () => {
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
        <SidebarDesktop />
      </Provider>
    )

  })

})