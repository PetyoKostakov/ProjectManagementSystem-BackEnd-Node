var taskController = function(Task) {
    return {
        post : function(req, res) {
            var task = new Task(req.body);
            task.save();

            if (!req.body.title) {
                res.status(400);
                res.send('Title is required');
            } else {
                res.status(201);
                res.send(task);
            }
        },
        get: function(req, res) {
            var query = req.query;

            // query param - adding the abbility to filter by query for example http://localhost:8000/api/task?done=true
            // will filter by genre
            Task.find(query, function (err, tasks) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(tasks);
                }
            });
        },
        put: function (req, res) {
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

            //res.json(req.task);
        },
        patch: function (req, res) {
            if (req.body._id) { // make sure that id won't be overridden
                delete req.body._id;
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
        },
        "delete": function (req, res) {
            req.task.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        },
        hasTask: function(req, res, next) {
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
        }
    };
};

module.exports = taskController;