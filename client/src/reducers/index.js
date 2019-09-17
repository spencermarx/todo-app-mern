// ======================================
// Require Packages
// ======================================
import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

// ======================================
// Define & Export Combined Reducer
// ======================================
export default combineReducers({
    todo: todoReducer,
    auth: authReducer,
    errors: errorReducer
});