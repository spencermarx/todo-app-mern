// ======================================
// Require Packages
// ======================================
import React, { Component } from "react";
import { Container, Form } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

// ======================================
// Require CSS
// ======================================
import './login.css';

// ======================================
// Define Component
// ======================================
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/todos"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/todos");
        }
    };

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    };

    handleSubmit(evt) {
        evt.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
    };
    render() {
        const { errors } = this.state;
        return (
            <Container className="Login">
                <h1 className="Login-header">Login</h1>
                <p>Login and start managing your todos!</p>
                <Form className="Login-form">
                    <Form.Group controlId="formPlaintextEmail">
                        <Form.Label sm="2">
                            Email
                            <span className="form-error">
                            {errors.email}
                            {errors.emailnotfound}
                            </span>
                        </Form.Label>
                        <Form.Control required placeholder="yourname@example.com" name="email" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formPlaintextPassword">
                        <Form.Label sm="2">
                            Password
                            <span className="form-error">
                            {errors.password}
                            {errors.passwordincorrect}
                            </span>
                        </Form.Label>
                        <Form.Control required type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                    </Form.Group>
                    <div className="Login-form-buttons d-flex justify-content-center align-items-center">
                        <Link className="Login-form-button custom-link-primary" variant="primary" to='/register'>
                            No Account? Sign Up!
                        </Link>
                        <Link className="Login-form-button btn custom-button-primary" variant="primary" onClick={this.handleSubmit} to='/login'>
                            Sign In
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
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
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
    { loginUser }
)(withRouter(Login));