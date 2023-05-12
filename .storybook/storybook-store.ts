import { createStore } from 'redux';
import rootReducer from "../src/redux/root-reducer"
import getMockState from "../src/testUtils/getMockState"

const initialState = getMockState()

const store = createStore(rootReducer, initialState);

export default store;