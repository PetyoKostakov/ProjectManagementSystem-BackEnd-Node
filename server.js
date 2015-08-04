var express = require('express'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    app = express(),
    //bodyParser get access to post data
    bookRouter = express.Router();

var db = mongoose.connect('mongodb://localhost/books'); // connects to db and creates collection if fo not exist

var Book = require('./models/bookModel');

bookRouter.route('/books')
    .get(function(req, res) {
        var query = req.query;

        // query param - adding the abbility to filter by query for example http://localhost:8000/api/books?genre=schience
        // will filter by genre
        Book.find(query/* adding the abbility to filter by query*/, function (err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    })
    .post(function(req, res) {
        var book = new Book();
    });

bookRouter.route('/books/:bookId')
    .get(function (req, res) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(book);
            }
        });
    });


app.use('/api', bookRouter);

app.get('/', function (req, res) {
  res.send('Node is restarting');
});

app.listen(port, function () {
  console.log('Listening on port', port);
});


