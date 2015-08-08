var taskController = function(Task) {
    var post = function(req, res) {
        var task = new Task(req.body);
        task.save();

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        } else {
            res.status(201);
            res.send(task);
        }
    };

    var get = function(req, res) {
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
    };

    return {
        post: post,
        get: get
    }
};

module.exports = taskController;