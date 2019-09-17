// ======================================
// Require Packages
// ======================================
import { GET_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO, TODOS_LOADING } from '../actions/types';

// ======================================
// Initialize State
// ======================================
// Set initial state
const initialState = {
    todos: [],
    loading: false,
}

// ======================================
// Define & Export Reducer
// ======================================
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TODOS:
            return {
                ...state,
                todos: action.payload,
                loading: false
            }

        case ADD_TODO:
            return {
                ...state,
                todos: [action.payload, ...state.todos]
            }

        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.payload)
            }

        case UPDATE_TODO:
            const filteredTodos = [...state.todos].filter(todo => todo._id !== action.payload._id);
            console.log(action.payload.isCompleted)
            if (action.payload.isCompleted) {
                return {
                    ...state,
                    todos: [...filteredTodos, action.payload]
                }
            }
            return {
                ...state,
                todos: [action.payload, ...filteredTodos]
            }

        case TODOS_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}