var restify     = require('restify'),
    config      = require('config'),
    laidata     = require('./routes/laidata');

var app = restify.createServer();

app.use(restify.queryParser());
app.use(restify.CORS());
app.use(restify.fullResponse());

// Routes
app.get('/', function (req, res) {
    res.status(200)
    res.header('Content-Type', 'text/html')
    res.write('Welcome to the Location Affordability Index API.  Learn more on <a href="https://github.com/jasonlally/location-affordability">GitHub</a>')
    res.end()
});

app.get('/blockgroup/:id', laidata.findById);
app.get('/blockgroup/:id/:field', laidata.getFieldById);
app.get('/blockgroups', laidata.getBlockgroups);

app.listen(8080);
console.log('Listening on port 8080...');
