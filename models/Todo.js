// ======================================
// Require Packages
// ======================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ======================================
// Define Schema
// ======================================
// Create Schema
const TodoSchema = new Schema({
    // Description = Todo description string
    description: {
        type: String,
        required: true
    },

    // ssCompleted = Whether todo has been completed
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },

    // dateDue = Due date for the todo
    dateDue: {
        type: Date,
        required: true
    },

    // Date = Date todo was created
    dateCreated: {
        type: Date,
        default: Date.now
    },
    // TODO: User = Author of todo
    //    user: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },

})

// ======================================
// Export Model
// ======================================
module.exports = mongoose.model('Todo', TodoSchema)