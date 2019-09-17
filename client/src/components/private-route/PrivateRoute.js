// ======================================
// Require Packages
// ======================================
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// ======================================
// Define Component
// ======================================
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

// ======================================
// Define Component PropTypes
// ======================================
PrivateRoute.propTypes = {
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
export default connect(mapStateToProps)(PrivateRoute);