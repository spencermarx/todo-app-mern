// ======================================
// Require Packages
// ======================================

const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require("passport"),
    path = require('path');


// Initialize Express
const app = express();

// ======================================
// Initialize Middleware
// ======================================
// BodyParser
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// TODO: ->
// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);
// ------|

// ======================================
// Database
// ======================================
// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log("Error:", err));

// ======================================
// Routes
// ======================================
// Define Routes
const todos = require('./routes/api/todos');
const users = require('./routes/api/users');

// Use Routes
app.use('/api', todos);
app.use('/api/users', users);

// ======================================
// Server
// ======================================
// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'))

    // Serve built index.html file
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

// Port
const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));