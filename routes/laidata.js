var mongo   = require('mongodb')
    config  = require('config');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

//var pass = false, user = false;

var server = new Server(config.dbHost, config.dbPort, {auto_reconnect: true}); //27017

/*
try {
    var env = JSON.parse(fs.readFileSync('../environment.json', 'utf-8'));
    console.log(env);
    var server = new Server(env['DOTCLOUD_DATA_MONGODB_HOST'], parseInt(env['DOTCLOUD_DATA_MONGODB_PORT']), {auto_reconnect: true});
    user = env['DOTCLOUD_DATA_MONGODB_LOGIN'];
    pass = env['DOTCLOUD_DATA_MONGODB_PASSWORD'];
} catch(err) {
    console.log(err);
    console.log('Could not read environment file');
}

if (!user) {
    var server = new Server('localhost', 27017, {auto_reconnect: true}); //27017
    user = '';
    pass = '';
}
*/

db = new Db('lai', server);

/*
db.authenticate('root', 'B13zimMS52bVstZGcIXh', function(err, res) {
    if (err) console.log(err);
}); */

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'lai' database");
        db.authenticate(config.dbUser,config.dbPass);
        db.collection('blkgrps', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'blockgroups' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    } else {
        console.log(config.dbHost + ' ' + config.dbPort + " " + process.env.NODE_ENV);
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
    var field = req.params.field;
    var id = req.params.id;
    console.log('Retrieving ' + field + ' for blockgroup ' + id);
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
            if(err) console.log(err);
            res.send(items);
        });
    });
};


var populateDB = function() {

    var data = []; //replace this with csv processor so admin can add a bunch of files to database
    //testing

    db.collection('blkgrps', function(err, collection) {
        collection.insert(data, {safe:true}, function(err, result) {});
    });

};