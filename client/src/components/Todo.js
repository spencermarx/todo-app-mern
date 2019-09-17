// ======================================
// Require Packages
// ======================================
import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

// ======================================
// Require Icons
// ======================================
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

// ======================================
// Require CSS
// ======================================
import './todo.css';

// ======================================
// Define & Export Component
// ======================================
export default class Todo extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

    }

    handleChange(evt) {
        let todo = {
            id: this.props.id,
            description: this.props.description,
            dateDue: this.props.dateDue,
            isCompleted: evt.target.checked
        };
        // console.log(todo);
        this.props.getCompleteState(todo)
    }

    handleEdit() {
        const { id, description, dateDue } = this.props;
        const currentTodo = {
            id: id,
            description: description,
            dateDue: dateDue
        };
        this.props.editTodo(currentTodo);
    }

    handleRemove() {
        this.props.removeTodo(this.props.id);
    }

    render() {
        const { description, dateDue, isCompleted } = this.props;
        const formatDate = new Date(dateDue);
        const isCompletedClass = isCompleted ? 'complete' : '';
        return (
            <ListGroup.Item className={`Todo ${isCompletedClass}`}>
                <input className="Todo-checkbox" type="checkbox" onChange={this.handleChange} checked={isCompleted}/>
                <p className="Todo-datedue">{`${formatDate.getMonth()+1}/${formatDate.getDate()}`}</p>
                <p className="Todo-description">{description}</p>
                <div className="Todo-actions">
                    <FontAwesomeIcon icon={faPencilAlt} onClick={this.handleEdit} />
                    <FontAwesomeIcon icon={faTrash} onClick={this.handleRemove} />
                </div>
            </ListGroup.Item >

        )
    }
}