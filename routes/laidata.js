var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

if (process.env.NODE_ENV == 'production') {
    var env = JSON.parse(fs.readFileSync('/home/dotcloud/environment.json', 'utf-8'));
    var server = new Server(env['DOTCLOUD_DATA_MONGODB_URL'], env['DOTCLOUD_DATA_MONGODB_PORT'], {auto_reconnect: true});
} else {
    var server = new Server('localhost', 27017, {auto_reconnect: true});
}

db = new Db('lai', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'lai' database");
        db.collection('blkgrps', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'blockgroups' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving blockgroup: ' + id);
    db.collection('blkgrps', function(err, collection) {
        collection.findOne({ 'blkgrp' : "'" + id + "'"}, function(err, item) { //TODO: remove single quotes from database later
            res.send(item);
        });
    });
};

exports.getFieldById = function(req, res) {
    console.log(req);
    var field = req.params.field;
    var id = req.params.id;
    console.log('Retrieving ' + field + ' for blockgroup' + id);
    db.collection('blkgrps', function(err, collection) {
        collection.findOne({ 'blkgrp' : "'" + id + "'"}, {fields : [field, 'blkgrp']}, function(err, item) {
           res.send(item);
        });
    });
}

exports.getBlockgroups = function(req, res) {
    console.log('Retrieving blockgroup ids');
    db.collection('blkgrps', function(err, collection) {
        collection.find({},{fields : ['blkgrp']}).toArray(function(err, items) {
            res.send(items);
        });
    });
};