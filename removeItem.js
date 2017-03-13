'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://loftportfolio:1q2w3e4r@ds123080.mlab.com:23080/inworldsloft", function (err, db) {

    var collection = db.collection('demodb');
//var newdoc = {number:1, value:"Hello world!"}
//collection.insert(newdoc,{w:1});
    //collection.update({number:1},{$set:{value:"New Information"}},{w:1});
    collection.remove();
});


