import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./index"
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import getMockState from "@/testUtils/getMockState";
import { act } from "react-dom/test-utils";

const mockStore = configureMockStore();

describe("Header Component", () => {
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
        <Header />
      </Provider>
    )
    
  })

  it("should open the modal when button 'add new task' clicked", async () => {

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    // opening modal
    await act(async () => {
      const buttonOpenAddTaskModal = screen.getByText("+ Add new Task")
  
      fireEvent.click(buttonOpenAddTaskModal)
    })

    const buttonEditTaskModal = await screen.findByText("Create Task")

    expect(buttonEditTaskModal).toBeInTheDocument()

    // closing modal
    await act(async () => {
      const buttonOpenAddTaskModal = screen.getByText("+ Add new Task")
  
      fireEvent.click(buttonOpenAddTaskModal)
    })

    expect(buttonEditTaskModal).not.toBeInTheDocument()

  })

  it("should find mobile menu button", async () => {

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )
    
    const button = await screen.findByTestId("mobile-menu-button")

    expect(button).toBeInTheDocument()

    // opening the modal on mobile 
    await act(async () => {
      const buttonOpenAddTaskModal = screen.getByText("+ Add new Task")
  
      fireEvent.click(buttonOpenAddTaskModal)
    })

    const buttonEditTaskModal = await screen.findByText("Create Task")

    expect(buttonEditTaskModal).toBeInTheDocument()

  }) 

})

export default {}