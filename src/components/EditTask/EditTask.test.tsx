import { Provider } from "react-redux"
import configureMockStore from 'redux-mock-store';
import getMockState from "@/testUtils/getMockState";
import { fireEvent, render, screen } from "@testing-library/react";
import EditTaskModal from ".";
import { mockCloseModal } from "@/testUtils/mocks";
import { act } from "react-dom/test-utils";

const mockStore = configureMockStore();

describe("Edit Task component", () => {
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
        <EditTaskModal task="Design settings and search pages" closeModal={mockCloseModal} />
      </Provider>
    )

  })

  it("should submit form correctly", async () => {

    render(
      <Provider store={store}>
        <EditTaskModal task="Design settings and search pages" closeModal={mockCloseModal} />
      </Provider>
    ) 

    await act(async () => {
      const button = await screen.findByText("Save Task")
      fireEvent.click(button)
    })

    const actions = store.getActions()

    expect(actions).toEqual([
      {
        payload:  {
        boardName: "My Board",
        description: "",
        name: "Design settings and search pages",
        status: "Todo",
        subtasks: [
            {
              id: 1,
              isCompleted: true,
              title: "Settings - Account page",
            },
          ],
        },
        type: "board/changeStatus",
      },
      {
        payload: {
          description: "",
          oldName: "Design settings and search pages",
          status: "Todo",
          subtasks:  [
            {
              id: 1,
              isCompleted: true,
              title: "Settings - Account page",
            },
          ],
          title: "Design settings and search pages",
        },
        type: "board/EditTask",
      },
    ])

  })

})