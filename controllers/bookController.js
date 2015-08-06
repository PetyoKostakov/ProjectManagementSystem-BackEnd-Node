var bookController = function(Book) {
    var post = function(req, res) {
        console.log('req.body', req.body);
        var book = new Book(req.body);
        book.save();

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        } else {
            console.log(book);
            res.status(201);
            res.send(book);
        }
    };

    var get = function(req, res) {
        var query = req.query;

        // query param - adding the abbility to filter by query for example http://localhost:8000/api/books?genre=schience
        // will filter by genre
        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    };

    return {
        post: post,
        get: get
    }
};

module.exports = bookController;