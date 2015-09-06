var express = require('express'),
    Task = require('../models/taskModel'),
    taskRouter = express.Router(),
    taskController = require('../controllers/taskController.js')(Task);

taskRouter.route('/tasks')
    .get(taskController.get)
    .post(taskController.post);

taskRouter.use('/tasks/:taskId', taskController.hasTask);  //middleware

taskRouter.route('/tasks/:taskId')
    .get(function (req, res) {
        res.json(req.task);
    })
    .put(taskController.put)
    .patch(taskController.patch)
    .delete(taskController.delete);

module.exports = taskRouter;