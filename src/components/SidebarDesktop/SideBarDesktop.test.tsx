import configureMockStore from 'redux-mock-store'; 
import getMockState from '@/testUtils/getMockState';
import { Provider } from 'react-redux';
import SidebarDesktop from '.';
import { fireEvent, render, screen } from '@testing-library/react';

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

  it("should close sidebar when button is clicked", async () => {

    render(
      <Provider store={store} >
        <SidebarDesktop />
      </Provider>
    )

    // closing sidebar
    const btnHideSidebar = await screen.findByTestId("btn-hide-sidebar")
    fireEvent.click(btnHideSidebar)
    
    const btnShowSidebar = await screen.findByTestId("btn-show-sidebar")

    // checking if the open sidebar button is present
    expect(btnShowSidebar).toBeInTheDocument()
  
  })

  it("should open sidebar when button is clicked", async () => {

    render(
      <Provider store={store} >
        <SidebarDesktop />
      </Provider>
    )

    // closing sidebar
    const btnHideSidebar = await screen.findByTestId("btn-hide-sidebar")
    fireEvent.click(btnHideSidebar)

    // opening sidebar 
    const btnShowSidebar = await screen.findByTestId("btn-show-sidebar")
    fireEvent.click(btnShowSidebar)

    expect(btnHideSidebar).not.toBeInTheDocument()

  })

})