// ======================================
// Require Packages
// ======================================
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// ======================================
// Initialize State & Middleware
// ======================================
// Set initial state
const initialState = {};
// Define middleware
const middleware = [thunk];

// ======================================
// Create store
// ======================================
const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

// ======================================
// Export store
// ======================================
export default store;