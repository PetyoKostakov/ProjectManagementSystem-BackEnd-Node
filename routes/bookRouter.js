var express = require('express'),
    Book = require('../models/bookModel'),
    bookRouter = express.Router(),
    bookController = require('../controllers/bookcontroller.js')(Book);

bookRouter.route('/books')
    .get(bookController.get)
    .post(bookController.post);

bookRouter.use('/books/:bookId', function(req, res, next) { //middle ware
    Book.findById(req.params.bookId, function (err, book) {
        if (err) {
            res.status(500).send(err);
        } else if (book) {
            req.book = book;
            next();
        } else {
            res.status(404).send('No book found');
        }
    });
});
bookRouter.route('/books/:bookId')
    .get(function (req, res) {
        res.json(req.book);
    })
    .put(function (req, res) {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        req.book.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.book);
            }
        });

        res.json(req.book);
    })
    .patch(function (req, res) {
        if (req.body._id) { // make sure that id won't be overridden
            delete req.body._id; //performance??
        }
        for (var p in req.body) {
            req.book[p] = req.body[p];
        }

        req.book.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.book);
            }
        })
    })
    .delete(function (req, res) {
        req.book.remove(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed');
            }
        });
    });


module.exports = bookRouter;