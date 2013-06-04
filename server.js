var express = require('express'),
    laidata = require('./routes/laidata');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/blockgroup/:id', laidata.findById);
app.get('/blockgroup/:id/:field', laidata.getFieldById);
app.get('/blockgroups', laidata.getBlockgroups);

app.listen(8080);
console.log('Listening on port 8080...');
