const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/', function (req, res) {
    let obj = {
        title: 'Править запись бд'
    };
    res.render('pages/save', obj);
});

//router.post('/', isAdmin, (req, res) => {
router.post('/', function (req, res) {

    if (!req.body.HTML5 || !req.body.CSS3 || !req.body.JavaScript) {
        //if (!req.body.HTML5 ) {
        //если что-либо не указано - сообщаем об этом
        return res.json({status: 'Укажите данные!'});
    }

    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect("mongodb://loftportfolio:1q2w3e4r@ds123080.mlab.com:23080/inworldsloft", function (err, db) {

        var collection = db.collection('skills');
        collection.update({group: "Frontend", "items.name": "HTML5"},
            {$set: {"items.$.counts": req.body.HTML5}},
            function (err, result) {
                if (err) {
                    console.log('Error updating user: ' + err);
                    res.json({status: 'При обновлении записи произошла ошибка: ' + err});
                } else {
                    collection.update({group: "Frontend", "items.name": "CSS3"},
                        {$set: {"items.$.counts": req.body.CSS3}},
                        function (err, result) {
                            if (err) {
                                console.log('Error updating user: ' + err);
                                res.json({status: 'При обновлении записи произошла ошибка: ' + err});
                            } else {
                                collection.update({group: "Frontend", "items.name": "JavaScript"},
                                    {$set: {"items.$.counts": req.body.JavaScript}},
                                    function (err, result) {
                                        if (err) {
                                            console.log('Error updating user: ' + err);
                                            res.json({status: 'При обновлении записи произошла ошибка: ' + err});
                                        } else {
                                            console.log('' + result + ' document(s) updated');
                                            return res.json({status: 'Запись успешно обновлена'});
                                        }
                                    });
                            }
                        });
                }
            });


    });
});


module.exports = router;