// ======================================
// Require Packages
// ======================================
import axios from "axios";

// ======================================
// Define setAuthToken Function
// ======================================
const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

// ======================================
// Export Function
// ======================================
export default setAuthToken;