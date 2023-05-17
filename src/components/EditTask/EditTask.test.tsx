import { Provider } from "react-redux"
import configureMockStore from 'redux-mock-store';
import getMockState from "@/testUtils/getMockState";
import { render, screen } from "@testing-library/react";
import EditTaskModal from ".";
import { mockCloseModal } from "@/testUtils/mocks";

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

  it("should submit form correctly", () => {

    render(
      <Provider store={store}>
        <EditTaskModal task="Design settings and search pages" closeModal={mockCloseModal} />
      </Provider>
    ) 

  })

})