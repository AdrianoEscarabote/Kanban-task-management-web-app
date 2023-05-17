import configureMockStore from 'redux-mock-store'; 
import getMockState from '@/testUtils/getMockState';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Ellipsis from '../EllipsisBoard';

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
        <Ellipsis />
      </Provider>
    )

  })

})