var express = require('express'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    app = express(),
    bodyParser = require('body-parser'),//bodyParser middle wear get access to post data
    taskRouter = require('./routes/taskRouter'),
    db;

if (process.env.ENV === 'Test') {
    db = mongoose.connect('mongodb://localhost/projectManagement-test');
} else {
    db = mongoose.connect('mongodb://localhost/projectManagement');
}

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json()); // parse json

app.use('/api', taskRouter);

app.use('/', express.static(__dirname + '/public/app/'));
app.use('/', express.static(__dirname + '/public/'));

app.listen(port, function () {
  console.log('Listening on port', port);
});

module.exports = app;
