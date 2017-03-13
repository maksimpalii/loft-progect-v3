'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://loftportfolio:1q2w3e4r@ds123080.mlab.com:23080/inworldsloft", function (err, db) {

// var collection = db.collection('demodb');
// var newdoc = {number:1, value:"Hello world!"}
// collection.insert(newdoc,{w:1});
//collection.update({number:1},{$set:{value:"New Information"}},{w:1});
    var collection = db.collection('backend');
    var newdoc = {"Frontend" : [
        {
            "name": "HTML5",
            "counts": "10"
        },
        {
            "name": "CSS3",
            "counts": "95"
        },
        {
            "name": "JavaScript & Jquery",
            "counts": "85"
        }
    ],
        "Backend" : [
            {
                "name": "PHP",
                "counts": "75"
            },
            {
                "name": "mySQL",
                "counts": "65"
            },
            {
                "name": "Node.js & npm",
                "counts": "55"
            },
            {
                "name": "Mongo.db",
                "counts": "45"
            }
        ],
        "WorkFlow" : [
            {
                "name": "Git",
                "counts": "35"
            },
            {
                "name": "Gulp",
                "counts": "25"
            },
            {
                "name": "Bower",
                "counts": "15"
            }
        ]}
    collection.insert(newdoc,{w:1});
});


