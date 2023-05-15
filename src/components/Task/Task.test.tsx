import configureMockStore from 'redux-mock-store';
import getMockState from "@/testUtils/getMockState";
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Column from '../Column';

const mockStore = configureMockStore();

describe("Task Component", () => {

  it("should render correctly", async () => {
    
    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store}>
        <Column colIndex={0} />
      </Provider>
    )

    const taskElement = await screen.findByText("Design settings and search pages")

    expect(taskElement).toBeInTheDocument()

  })
  
  it("should open view task modal when button is clicked", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store}> 
        <Column colIndex={0} />
      </Provider>
    )

    const buttons = screen.getAllByRole("button").filter((button: any) => button.value === "Design settings and search pages");
    const buttonElement = buttons[0]

    fireEvent.click(buttonElement)

    const optionElement = screen.getByRole("option")

    expect(optionElement).toBeInTheDocument()

  })

})