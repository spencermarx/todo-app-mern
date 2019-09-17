// ======================================
// Require Packages
// ======================================
import React, { Component } from 'react';
import Todo from './Todo';
import TodoModal from './TodoModal';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTodos, deleteTodo, updateTodo } from '../actions/todoActions';
import PropTypes from 'prop-types';

// ======================================
// Require CSS
// ======================================
import './todolist.css';

// ======================================
// Define Component
// ======================================
class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            currentTodo: {},
        }

        this.editTodo = this.editTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.removeImportedTodo = this.removeImportedTodo.bind(this);
        this.getCompleteState = this.getCompleteState.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);

    }

    // Lifecycle - Did Mount
    componentDidMount() {
        this.props.getTodos(this.props.auth.user.id);
    }

    // Edit Todo
    editTodo(todo) {
        this.setState({
            currentTodo: todo
        }, () => {
            this.onShow('edit');
        })
    }
    // Remove Todo
    removeTodo(todoId) {
        this.props.deleteTodo(this.props.auth.user.id, todoId);
    }

    removeImportedTodo() {
        this.setState({
            currentTodo: {}
        })
    }

    // Get Checked Box State
    getCompleteState(todo) {
        // Update Todos in Redux
        this.props.updateTodo(this.props.auth.user.id, todo);
    }

    // Show Modal (Bootstrap Naming)
    onShow(str) {
        if (str === 'edit') {
            this.setState({ showModal: true });
        } else {
            console.log('Straight Add!')
            this.setState({ showModal: true, currentTodo: {} });
        }
    }

    // Hide Modal (Bootstrap Naming)
    onHide() {
        this.setState({ showModal: false, currentTodo: {} })
    }

    render() {
        console.log("Render Event")
        let todos = this.props.todo.todos.map(todo => {
            return (<Todo
                key={todo._id}
                description={todo.description}
                id={todo._id}
                dateDue={todo.dateDue}
                isCompleted={todo.isCompleted}
                editTodo={this.editTodo}
                removeTodo={this.removeTodo}
                getCompleteState={this.getCompleteState} />)
        });
        return (
            <Container className="TodoList">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="TodoList-header">Current Todos</h1>
                    <Button className='custom-button-primary' onClick={this.onShow}>Add Todo</Button>
                </div>
                <ListGroup className="my-3">
                    {todos}
                </ListGroup>
                <TodoModal
                    show={this.state.showModal}
                    onHide={this.onHide}
                    importTodo={this.state.currentTodo}
                    removeImportedTodo={this.removeImportedTodo} />
            </Container>
        )
    }
}

// ======================================
// Define Component PropTypes
// ======================================
TodoList.propTypes = {
    getTodos: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

// ======================================
// Map Redux state to Component state
// ======================================
const mapStateToProps = (state) => ({
    todo: state.todo,
    auth: state.auth
})

// ======================================
// Export Redux-enabled Component
// ======================================
export default connect(mapStateToProps, { getTodos, deleteTodo, updateTodo })(TodoList);