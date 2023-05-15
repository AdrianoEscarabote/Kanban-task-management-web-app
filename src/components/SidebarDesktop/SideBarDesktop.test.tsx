import configureMockStore from 'redux-mock-store'; 
import getMockState from '@/testUtils/getMockState';
import { Provider } from 'react-redux';
import SidebarDesktop from '.';
import { render } from '@testing-library/react';

const mockStore = configureMockStore();

describe("Sidebar Component", () => {

  it("should render correctly", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store} >
        <SidebarDesktop />
      </Provider>
    )

  })

})