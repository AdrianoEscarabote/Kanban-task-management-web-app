import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./index"
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import getMockState from "@/testUtils/getMockState";

const mockStore = configureMockStore();

describe("Header Component", () => {
  
  it("should render correctly", () => {
    const mockState = getMockState()

    const store = mockStore(mockState)
    
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )
  })

  it("should open the modal when button 'add new task' clicked", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    const button = screen.getByText("+ Add new Task")

    fireEvent.click(button)

    const TaskModalElement = screen.getByText("put your task information")

    expect(TaskModalElement).toBeInTheDocument()

    fireEvent.click(button)

    const TaskModalElementNotToBe = screen.queryByText("put your task information")

    expect(TaskModalElementNotToBe).not.toBeInTheDocument()

  })

  
})

export default {}