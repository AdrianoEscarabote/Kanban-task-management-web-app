import getMockState from "@/testUtils/getMockState"
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store'; 
import Ellipsis from ".";
import { act } from "react-dom/test-utils";

const mockStore = configureMockStore()

describe("Ellipsis Board Component", () => {
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
        <Ellipsis />
      </Provider>
    )

  })

  it("should open edit modal when button is clicked", async () => {

    render(
      <Provider store={store} >
        <Ellipsis />
      </Provider>
    )

    await act(async () => {
      const ellipsisButton = screen.getByTestId("button-ellipsis-board")
  
      fireEvent.click(ellipsisButton)
  
    })
    // opening edit modal  
    const buttonEditBoard = await screen.findByTestId("btn-edit-board")
    
    fireEvent.click(buttonEditBoard)

    const editModalElement = await screen.findByText("Save Changes")

    expect(editModalElement).toBeInTheDocument()
    
  })

  it("should open delete modal when button is clicked", async () => {

    render(
      <Provider store={store} >
        <Ellipsis />
      </Provider>
    )

    await act(async () => {
      const ellipsisButton = screen.getByTestId("button-ellipsis-board")
  
      fireEvent.click(ellipsisButton)
    })
    // opening delete modal
    const buttonDeleteBoard = await screen.findByTestId("btn-delete-board")

    fireEvent.click(buttonDeleteBoard)

    const deleteModalElement = await screen.findByText("Delete this My Board ?")

    expect(deleteModalElement).toBeInTheDocument()

  })

})