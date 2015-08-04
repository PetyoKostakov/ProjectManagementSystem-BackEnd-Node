var express = require('express'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    app = express(),
    dobyParser = require('body-parser'),//bodyParser middle wear get access to post data
    bookRouter = require('./routes/bookRouter');

var db = mongoose.connect('mongodb://localhost/books'); // connects to db and creates collection if fo not exist



app.use(dobyParser.urlencoded({extended: true })); //
app.use(dobyParser.json()); // parse json


app.use('/api', bookRouter);

app.get('/', function (req, res) {
  res.send('Node is restarting');
});

app.listen(port, function () {
  console.log('Listening on port', port);
});


