var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var pass = false, user = false;

try {
    var env = JSON.parse(fs.readFileSync('../environment.json', 'utf-8'));
    var server = new Server(env['DOTCLOUD_DATA_MONGODB_HOST'], env['DOTCLOUD_DATA_MONGODB_PORT'], {auto_reconnect: true});
    user = env['DOTCLOUD_DATA_MONGODB_LOGIN'];
    pass = env['DOTCLOUD_DATA_MONGODB_PASSWORD'];
} catch(err) {
    console.log('Could not read environment file');
}

if (!user) {
    var server = new Server('localhost', 27017, {auto_reconnect: true}); //27017
    user = '';
    pass = '';
}

db = new Db('lai', server);

/*
db.authenticate('root', 'B13zimMS52bVstZGcIXh', function(err, res) {
    if (err) console.log(err);
}); */

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'lai' database");
        db.authenticate(user,pass);
        db.collection('blkgrps', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'blockgroups' collection doesn't exist. Creating it with sample data...");
                //populateDB();
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
            if(err) console.log(err);
            res.send(items);
        });
    });
};


var populateDB = function() {

    var wines = [
        {
            name: "CHATEAU DE SAINT COSME",
            year: "2009",
            grapes: "Grenache / Syrah",
            country: "France",
            region: "Southern Rhone",
            description: "The aromas of fruit and spice...",
            picture: "saint_cosme.jpg"
        },
        {
            name: "LAN RIOJA CRIANZA",
            year: "2006",
            grapes: "Tempranillo",
            country: "Spain",
            region: "Rioja",
            description: "A resurgence of interest in boutique vineyards...",
            picture: "lan_rioja.jpg"
        }];

    db.collection('wines', function(err, collection) {
        collection.insert(wines, {safe:true}, function(err, result) {});
    });

};