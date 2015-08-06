var should = require('should'),
    request = require('supertest'),
    app = require('../server.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('book'),
    agent = request.agent(app); //execute all http calls


describe('Book Crud Test', function() {
    it('Should allow a book to be posted and return a read and _id', function(done){
        var bookPost = {title:'new Book', author:'Jon', genre:'Fiction'};

        agent.post('/api/books')
            .send(bookPost)
            .expect(201)
            .end(function (err, results) {
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done()
            })
    });

    afterEach(function (done) {
        Book.remove().exec();
        done();
    })
});