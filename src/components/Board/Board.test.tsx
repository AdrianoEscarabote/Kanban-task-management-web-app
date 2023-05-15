import { Provider } from "react-redux"
import configureMockStore from 'redux-mock-store';
import getMockState from "@/testUtils/getMockState";
import Board from ".";
import { fireEvent, render, screen } from "@testing-library/react";

const mockStore = configureMockStore();

describe("Board Component", () => {

  it("should render correctly", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store}>
        <Board />
      </Provider>
    )

  })

  it("should open edit board modal when button is clicked", async () => {
    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store}>
        <Board />
      </Provider>
    )

    const button = await screen.findByText("+ New Column")

    fireEvent.click(button)

    const legendElement = screen.getByText("enter information to edit the table")

    expect(legendElement).toBeInTheDocument()

  })

})