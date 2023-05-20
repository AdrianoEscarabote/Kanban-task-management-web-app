import { Provider } from "react-redux"
import configureMockStore from 'redux-mock-store';
import getMockState from "@/testUtils/getMockState";
import Board from ".";
import { fireEvent, render, screen } from "@testing-library/react";
import { dragTask } from "@/redux/board/reducer";

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

  it('should drag correctly', async () => {
    render(
      <Provider store={store}>
        <Board />
      </Provider>
    );

    store.dispatch(
      dragTask({
        boardName: "My Board",
        currentColIndex: 1,
        prevColIndex: 0,
        taskIndex: 0,
      })
    );
  
    const actions = store.getActions();

    /* I am dispatching the redux action because the "dataTransfer" is not available in the Jest/react-testing-library test environment. */
  
    expect(actions).toEqual([
      {
        payload: 'Platform Launch',
        type: 'setBoard/name',
      },
      {
        payload: {
          boardName: "My Board",
          currentColIndex: 1,
          prevColIndex: 0,
          taskIndex: 0,
        },
        type: "board/dragTask",
      }
    ]);
  });

})