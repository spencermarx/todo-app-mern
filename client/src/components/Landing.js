// ======================================
// Require Packages
// ======================================
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// ======================================
// Require Image
// ======================================
import logo from '../images/logo.svg'

// ======================================
// Require CSS
// ======================================
import './landing.css'

// ======================================
// Define Component
// ======================================
class Landing extends Component {
    render() {
        return (
            <Container className="Landing">
                <div className="Landing-hero">
                    <img src={logo} className="Landing-hero-image" alt="Check mark" />
                    <h1>Welcome</h1>
                    <h5 className="text-muted">This is your personal todo app!</h5>
                </div>
                <div className="Landing-links">
                    <Link className="btn custom-button-secondary" to='/register'>Sign Up</Link>
                    <Link className="btn custom-button-primary" to='/login'>Login</Link>
                </div>
            </Container>

        )
    }
}

// ======================================
// Export Component
// ======================================
export default Landing;
