var express = require('express'),
    Task = require('../models/taskModel'),
    taskRouter = express.Router(),
    taskController = require('../controllers/taskController.js')(Task);

taskRouter.route('/tasks')
    .get(taskController.get)
    .post(taskController.post);

taskRouter.use('/tasks/:taskId', function(req, res, next) { //middle ware
    Task.findById(req.params.taskId, function (err, task) {
        if (err) {
            res.status(500).send(err);
        } else if (task) {
            req.task = task;
            next();
        } else {
            res.status(404).send('No task found');
        }
    });
});
taskRouter.route('/tasks/:taskId')
    .get(function (req, res) {
        res.json(req.task);
    })
    .put(function (req, res) {
        req.task.title = req.body.title;
        req.task.description = req.body.description;
        req.task.todo = req.body.todo;
        req.task.actual = req.body.actual;
        req.task.estimate = req.body.estimate;
        req.task.done = req.body.done;
        req.task.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.task);
            }
        });

        res.json(req.task);
    })
    .patch(function (req, res) {
        if (req.body._id) { // make sure that id won't be overridden
            delete req.body._id; //performance??
        }
        for (var t in req.task) {
            req.task[t] = req.task[t];
        }

        req.task.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.task);
            }
        })
    })
    .delete(function (req, res) {
        req.task.remove(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed');
            }
        });
    });


module.exports = taskRouter;