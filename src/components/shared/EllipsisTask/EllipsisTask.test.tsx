import configureMockStore from 'redux-mock-store'; 
import getMockState from '@/testUtils/getMockState';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Ellipsis from './index';
import { act } from 'react-dom/test-utils';
import { mockCloseModal, mockOpenDeleteTaskModal, mockOpenEditTaskModal } from '@/testUtils/mocks';
import { warnOptionHasBeenMovedOutOfExperimental } from 'next/dist/server/config';

const mockStore = configureMockStore()

describe("Ellipsis Task Component", () => {
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
        <Ellipsis 
          closeModal={mockCloseModal} 
          openDeleteTaskModal={mockOpenDeleteTaskModal} 
          openEditTaskModal={mockOpenEditTaskModal} 
        />
      </Provider>
    )

  })

  it("should open options when button is clicked", async () => {
    
    render(
      <Provider store={store} >
        <Ellipsis 
          closeModal={mockCloseModal} 
          openDeleteTaskModal={mockOpenDeleteTaskModal} 
          openEditTaskModal={mockOpenEditTaskModal} 
        />
      </Provider>
    )

    await act(async () => {
      const ellipsisButton = await screen.findByTestId("button-ellipsis-task")
  
      fireEvent.click(ellipsisButton)
    })
    
    const buttonEditModal = await screen.findByTestId("btn-edit-modal")
    const buttonDeleteModal = await screen.findByTestId("btn-delete-modal")

    fireEvent.click(buttonEditModal)
    fireEvent.click(buttonDeleteModal)

    expect(buttonEditModal).toBeInTheDocument()
    expect(buttonDeleteModal).toBeInTheDocument()
    
  })

})