const Todo = require('../model/todo.js');

module.exports = (router) => {

    //Assigning a new task
    router.post('/assignTask', (req, res) => {
        if (!req.body.title) {
            res.json({ success: false, message: 'You Must have to enter title' })
        } else {
            if (!req.body.body) {
                res.json({ success: false, message: 'You Must have to enter body' })
            } else {
                if (!req.body.author) {
                    res.json({ success: false, message: 'You Must have to enter author' })
                } else {
                    const todo = new Todo({
                        title: req.body.title,
                        body: req.body.body,
                        author: req.body.author
                    })
                    todo.save((err) => {
                        if (err) {
                            if (err.code == 11000) {
                                res.json({ success: false, message: 'Duplicate Entry!' })
                            } else {
                                if (err.errors) {
                                    if (err.errors.title) {
                                        res.json({ success: false, message: err.errors.title.message })
                                    } else {
                                        if (err.errors.body) {
                                            res.json({ success: false, message: err.errors.body.message })
                                        } else {
                                            if (err.errors.author) {
                                                res.json({ success: false, message: 'Enter the author name properly' })
                                            } else {
                                                res.json({ success: false, message: err })
                                            }
                                        }
                                    }
                                } else {
                                    res.json({ success: false, message: err })
                                }
                            }
                        } else {
                            res.json({ success: true, message: 'Task Assignment done successfully!', todo: todo })
                        }
                    })
                }
            }
        }
    })

    //get All Assignments
    router.get('/allAssignments', (req, res) => {
        Todo.find({}, (err, todo) => {
            if (err) {
                res.json({ success: false, message: err })
            } else {
                if (!todo) {
                    res.json({ success: true, message: 'NO Assignments Found!' })
                } else {
                    res.json({ success: true, message: 'Here is all your assignments', todo: todo })
                }
            }
        })
    })

    //get Assignments by id
    router.get('/assignments/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No assignment ID was provided!!' })
        } else {
            Todo.findOne({ _id: req.params.id }, (err, todo) => {
                if (err) {
                    res.json({ success: false, message: 'Ensure Assignment ID is correct!' })
                } else {
                    if (!todo) {
                        res.json({ success: false, message: 'No Assignments Found for this ID' })
                    } else {
                        res.json({ success: true, message: 'Assignments Found!', todo: todo })
                    }
                }
            })
        }
    })

    //update assignments
    router.put('/updateTask', (req, res) => {
        if (!req.body._id) {
            res.json({ success: false, message: 'Id is required to update' })
        } else {
            Todo.findOne({ _id: req.body._id }, (err, todo) => {
                if (err) {
                    res.json({ success: false, message: 'Entered Id is incorrect' })
                } else {
                    if (!todo) {
                        res.json({ success: false, message: 'No Tasks found  for this id' })
                    } else {
                        todo.title = req.body.title,
                            todo.body = req.body.body,
                            todo.author = req.body.author
                        todo.save((err) => {
                            if (err) {
                                if (err.code == 11000) {
                                    res.json({ success: false, message: 'Duplicate Entry!' })
                                } else {
                                    if (err.errors) {
                                        if (err.errors.title) {
                                            res.json({ success: false, message: err.errors.title.message })
                                        } else {
                                            if (err.errors.body) {
                                                res.json({ success: false, message: err.errors.body.message })
                                            } else {
                                                if (err.errors.author) {
                                                    res.json({ success: false, message: 'Enter the author name properly' })
                                                } else {
                                                    res.json({ success: false, message: err })
                                                }
                                            }
                                        }
                                    } else {
                                        res.json({ success: false, message: err })
                                    }
                                }
                            } else {
                                res.json({ success: true, message: 'Task Assignment UPDATED successfully!', todo: todo })
                            }
                        })
                    }
                }
            })
        }
    })

    //Delete the tasks by id
    router.delete('/deleteTask/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'Ensure to enter the id of Assignment you want to delete' })
        } else {
            Todo.findOne({ _id: req.params.id }, (err, todo) => {
                if (err) {
                    res.json({ success: false, message: 'Ensure to Enter the corect AssgnmentId' })
                } else {
                    if (!todo) {
                        res.json({ success: false, message: 'No Tasks found' })
                    } else {
                        todo.remove((err) => {
                            if (err) {
                                res.json({ success: false, message: 'Couldnot delete...' })
                            } else {
                                res.json({ success: true, message: 'Deleted Successfully', todo: todo })
                            }
                        })
                    }
                }
            })
        }
    })

    //Delete All Tasks
    router.delete('/deleteAll', (req, res) => {
        Todo.find({}, (err, todo) => {
            if (err) {
                res.json({ success: false, message: err })
            } else {
                if (!todo) {
                    res.json({ success: false, message: 'No Task to delete' })
                } else {
                    Todo.remove((err) => {
                        if (err) {
                            res.json({ success: false, message: err })
                        } else {
                            res.json({ success: true, message: 'All records got deleted' })
                        }
                    })
                }
            }
        })
    })
    return router;
}