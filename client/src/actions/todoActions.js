// ======================================
// Require Packages
// ======================================
import axios from 'axios';
import { GET_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO, TODOS_LOADING } from './types';

// ======================================
// Export todoActions
// ======================================

// Get todos
export const getTodos = userId => dispatch => {
    dispatch(setTodosLoading());
    axios
        .get(`api/${userId}/todos`)
        .then(res =>
            dispatch({
                type: GET_TODOS,
                payload: res.data
            }));
};

// Create todo
export const addTodo = (userId, todo) => dispatch => {
    axios
        .post(`api/${userId}/todos`, { todo })
        .then(res =>
            dispatch({
                type: ADD_TODO,
                payload: res.data
            }))
};

// Delete todo
export const deleteTodo = (userId, todoId ) => dispatch => {
    axios
        .delete(`api/${userId}/todos/${todoId}`)
        .then(res =>
            dispatch({
                type: DELETE_TODO,
                payload: todoId
            }));

};

// Update todo
export const updateTodo = (userId, todo) => dispatch => {
    const {id, ...modifiedTodo} = todo;
    axios
        .put(`api/${userId}/todos/${id}`, {modifiedTodo})
        .then(res =>
            dispatch({
                type: UPDATE_TODO,
                payload: res.data
            }))
};

// Set todoLoading Status
export const setTodosLoading = () => {
    return {
        type: TODOS_LOADING
    }
}