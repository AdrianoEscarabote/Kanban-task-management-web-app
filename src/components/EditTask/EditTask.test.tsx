import { Provider } from "react-redux"
import configureMockStore from 'redux-mock-store';
import getMockState from "@/testUtils/getMockState";
import { render, screen } from "@testing-library/react";
import EditTaskModal from ".";

const mockStore = configureMockStore();

describe("Edit Task component", () => {

  it("should render correctly", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store}>
        <EditTaskModal task="Design settings and search pages" closeModal={() => {}} />
      </Provider>
    )

  })

  it("should submit form correctly", () => {

    const mockState = getMockState()

    const store = mockStore(mockState)

    render(
      <Provider store={store}>
        <EditTaskModal task="Design settings and search pages" closeModal={() => {}} />
      </Provider>
    )

    /* const form = screen.getByRole("form") */

    

  })

})