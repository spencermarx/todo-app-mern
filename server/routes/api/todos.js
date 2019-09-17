// ======================================
// Require Packages
// ======================================
const express = require('express');
const router = express.Router();

// ======================================
// Require Models
// ======================================
const Todo = require('../../models/Todo');
const User = require('../../models/User');


// ======================================
// Routes
// ======================================

// @route   GET api/todos
// @desc    Get all todos
// @access  Private
router.get('/:userId/todos', (req, res) => {
    User.findById(req.params.userId)
        .populate('todos')
        .then(user => {
            res.json(user.todos)
        })
        .catch(err => console.log("Error:", err));

})

// @route   POST api/todos
// @desc    Create a todo
// @access  Private
router.post('/:userId/todos', (req, res) => {

    const newTodo = new Todo({
        description: req.body.todo.description,
        dateDue: req.body.todo.dateDue,
        isCompleted: req.body.todo.isCompleted
    });

    Todo.create(newTodo)
        .then(todo => {
            User.findById(req.params.userId)
                .then(user => {
                    user.todos.push(newTodo);
                    user.save()
                        .then(result => {
                            console.log(result)
                            res.json(newTodo)
                        });
                })
                .catch(err => console.log("Error:", err))
        })
        .catch(err => console.log("Error:", err));

});

// @route   PUT api/todos/:id
// @desc    Update a todo
// @access  Private
router.put('/:userId/todos/:todoId', (req, res) => {
    const updatedTodo = {
        description: req.body.modifiedTodo.description,
        isCompleted: req.body.modifiedTodo.isCompleted,
        dateDue: req.body.modifiedTodo.dateDue,
    };

    Todo.findByIdAndUpdate(req.params.todoId, updatedTodo, { new: true })
        .then(todo => res.json(todo))
        .catch(err => console.log("Error:", err));


})

// @route   DELETE api/todos/:id
// @desc    Delete a todo
// @access  Private
router.delete('/:userId/todos/:todoId', (req, res) => {
    Todo.findById(req.params.todoId)
        .then(todo => {
            todo.remove()
                .then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json({ success: false }));
})

module.exports = router;