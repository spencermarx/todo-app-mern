// ======================================
// Require Packages
// ======================================
import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import AppDatePicker from './AppDatePicker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo, updateTodo } from '../actions/todoActions';

// ======================================
// Define Component
// ======================================
class TodoModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: this.props.importTodo.description ? this.props.importTodo.description : '',
            dateDue:  this.props.importTodo.dateDue ? this.props.importTodo.dateDue : new Date(Date.now()).toISOString(),
            isCompleted: this.props.importTodo.isCompleted ? this.props.importTodo.isCompleted : false,
        }
        this.getDate = this.getDate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log(this.props.importTodo);
    }

    getDate(date){
        this.setState({ dateDue: date.toISOString()})
    }

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit(evt){
        evt.preventDefault();
        let newTodo;
        console.log(this.props.importTodo);
        // If importTodo is present
        if(Object.entries(this.props.importTodo).length > 0){
            console.log("Updating todo")
             newTodo = {
                id: this.props.importTodo.id,
                description: this.state.description,
                dateDue: this.state.dateDue,
                isCompleted: this.state.isCompleted
            }
            // Add todo via addTodo action
            this.props.updateTodo(this.props.auth.user.id, newTodo);
        } else {
            console.log("Adding new todo")
             newTodo = {
                description: this.state.description,
                dateDue: this.state.dateDue,
                isCompleted: this.state.isCompleted
            }
            // Add todo via addTodo action
            this.props.addTodo(this.props.auth.user.id, newTodo);
        }


        // Close Modal
        this.props.onHide();

        // Reset Inner Data
        this.setState({
            description: this.props.importTodo.description ? this.props.importTodo.description : '',
            dateDue:  this.props.importTodo.dateDue ? this.props.importTodo.dateDue : new Date(Date.now()).toISOString(),
            isCompleted: this.props.importTodo.isCompleted ? this.props.importTodo.isCompleted : false,
        });

        // Remove imported Todo
        this.props.removeImportedTodo();
    }

    render() {

        const {description } = this.props.importTodo;
        const {addTodo, updateTodo, importTodo, removeImportedTodo, ...defaultModalProps} = this.props

        return (

            <Modal
                {...defaultModalProps}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add todo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formTodo">
                        <Form.Label>What do you have to do?</Form.Label>
                        <Form.Control
                        required
                        type="text"
                        placeholder={description ? description : `'Get milk'`}
                        name="description"
                        onChange={this.handleChange}/>
                    </Form.Group>
                    <AppDatePicker getDate={this.getDate} dateDue={this.dateDue}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="custom-button-secondary" onClick={this.props.onHide}>Close</Button>
                    <Button className="custom-button-primary" onClick={this.handleSubmit}>Add</Button>
                </Modal.Footer>
            </Modal>

        )
    }
}

// ======================================
// Define Component PropTypes
// ======================================
TodoModal.propTypes = {
    addTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    importTodo: PropTypes.object,
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
export default connect(mapStateToProps, {addTodo, updateTodo})(TodoModal);