var should = require('should'),
    sinon = require('sinon');

describe('Book Controller Tests: ', function () {
   describe('Post', function () {
      it('Should not allow an empty title on post', function () {
          var Book = function(book) {
              this.save = function(){}; //we need to have this function in order to bookController work properly
          };

          var req = {
              body: {
                  author: 'Jon'
              }
          };

          var res = {
              status: sinon.spy(),
              send: sinon.spy()
          };

          var bookController = require('../controllers/bookcontroller.js')(Book);
          bookController.post(req, res);

          res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
          res.send.calledWith('Title is required').should.equal(true);
      });
   });
});