import configureMockStore from "redux-mock-store"
import getMockState from "@/testUtils/getMockState"
import { fireEvent, render, screen, act } from "@testing-library/react"
import { Provider } from "react-redux"
import AddBoardModal from "."
import { mockCloseModal } from "../../testUtils/mocks"

const mockStore = configureMockStore()

describe("Add Board Modal", () => {
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
        <AddBoardModal closeModal={mockCloseModal} />
      </Provider>
    )
  })

  it("should submit form correctly", async () => {

    render(
      <Provider store={store}>
        <AddBoardModal closeModal={mockCloseModal} />
      </Provider>
    )

    const nameInput = screen.getByLabelText(/name/i);
    const createButton = screen.getByLabelText(/create new board/i);

    // Simulate user interaction, inserting a value into the input and clicking the submit button.

    fireEvent.change(nameInput, { target: { value: 'My Board' } });
    fireEvent.click(createButton);

    await act(async () => {
      expect(screen.getByLabelText(/add new board/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/name/i)).toHaveValue('My Board');
    });

    expect(mockCloseModal).toBeCalled();

  })

})