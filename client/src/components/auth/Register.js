// ======================================
// Require Packages
// ======================================
import React, { Component } from "react";
import { Container, Form } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

// ======================================
// Require CSS
// ======================================
import './register.css';

// ======================================
// Define Component
// ======================================
class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/todos");
        }
      }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    };

    handleSubmit(evt) {
        evt.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    };
    render() {
        const { errors } = this.state;
        return (
            <Container className="Register">
                <h1 className="Register-header">Welcome</h1>
                <p>Register below to get started and enhance your productivity!</p>
                <Form className="Register-form">
                    <Form.Group >
                        <Form.Label >
                            Email
                            <span className="form-error">{errors.email}</span>
                        </Form.Label>
                        <Form.Control required placeholder="yourname@example.com" name="email" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label >
                            Password
                            <span className="form-error">{errors.password}</span>
                        </Form.Label>
                        <Form.Control required type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label >
                            Confirm Password
                            <span className="form-error">{errors.password2}</span>
                        </Form.Label>
                        <Form.Control required type="password" placeholder="Retype Password" name="password2" onChange={this.handleChange} />
                    </Form.Group>
                    <div className="Register-form-buttons d-flex justify-content-center align-items-center">
                        <Link className="Register-form-button custom-link-primary" variant="primary" to='/login'>
                            Got an account? Login!
                        </Link>
                        <Link className="Register-form-button btn custom-button-primary" variant="primary" onClick={this.handleSubmit} to='/register'>
                            Sign Up
                        </Link>
                    </div>
                </Form>
            </Container>
        );
    }
}

// ======================================
// Define Component PropTypes
// ======================================
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

// ======================================
// Map Redux state to Component state
// ======================================
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

// ======================================
// Export Redux & Router-enabled Component
// ======================================
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));