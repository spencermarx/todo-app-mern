// ======================================
// Require Packages
// ======================================
import React, { Component, Fragment } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

// ======================================
// Require CSS
// ======================================
import './appnavbar.css';

// ======================================
// Define Component
// ======================================
class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleToggle() {
        // Set state
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    handleClick() {

        // Handle Toggle
        this.handleToggle();
    }

    handleLogout(evt) {
        evt.preventDefault();
        this.props.logoutUser();
        this.props.history.push("/");
    };

    render() {
        return (
            <Navbar className="AppNavBar" expand="sm">
                <Container>
                    {this.props.auth.isAuthenticated ?
                        <Link to={`/todos`} className="AppNavBar-brand custom-link-white">Todo App</Link>
                        : <Link to="/" className="AppNavBar-brand custom-link-white">Todo App</Link>
                    }
                    <Navbar.Toggle onClick={this.handleClick} aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {this.props.auth.isAuthenticated ?
                                <Fragment>
                                    <p className="AppNavBar-links AppNavBar-links-email custom-link-white text-center">Hi {this.props.auth.user.email}!</p>
                                    <p className="AppNavBar-links custom-link-white text-center" onClick={this.handleLogout}>Logout</p>
                                </Fragment>
                                :
                                <Fragment>

                                    <Link className="AppNavBar-links custom-link-white text-center" to='/login'>Login</Link>
                                    <Link className="AppNavBar-links custom-link-white text-center" to='/register'>Sign-up</Link>
                                </Fragment>
                            }


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

// ======================================
// Define Component PropTypes
// ======================================
AppNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

// ======================================
// Map Redux state to Component state
// ======================================
const mapStateToProps = state => ({
    auth: state.auth
});

// ======================================
// Export Redux & Router-enabled Component
// ======================================
export default connect(
    mapStateToProps,
    { logoutUser }
)(withRouter(AppNavbar));