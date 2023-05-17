import { Provider } from "react-redux"
import configureMockStore from 'redux-mock-store';
import getMockState from "@/testUtils/getMockState";
import Board from ".";
import { fireEvent, render, screen } from "@testing-library/react";

const mockStore = configureMockStore();

describe("Board Component", () => {

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
        <Board />
      </Provider>
    )

  })

  it("should open edit board modal when button is clicked", async () => {
    
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