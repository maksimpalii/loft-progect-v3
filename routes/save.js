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

    // if (!req.body.HTML5 || !req.body.CSS3 || !req.body.JavaScript) {
    //     //if (!req.body.HTML5 ) {
    //     //если что-либо не указано - сообщаем об этом
    //     return res.json({status: 'Укажите данные!'});
    // }

    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect("mongodb://loftportfolio:1q2w3e4r@ds123080.mlab.com:23080/inworldsloft", function (err, db) {

        var collection = db.collection('skills');
        collection.update({group: "Frontend", "items.id": "f1"},
            {$set: {"items.$.counts": req.body.f1}},
            function (err, result) {
                if (err) {
                    console.log('Error updating user: ' + err);
                    res.json({status: 'При обновлении записи произошла ошибка: ' + err});
                } else {
                    collection.update({group: "Frontend", "items.id": "f2"},
                        {$set: {"items.$.counts": req.body.f2}},
                        function (err, result) {
                            if (err) {
                                console.log('Error updating user: ' + err);
                                res.json({status: 'При обновлении записи произошла ошибка: ' + err});
                            } else {
                                collection.update({group: "Frontend", "items.id": "f3"},
                                    {$set: {"items.$.counts": req.body.f3}},
                                    function (err, result) {
                                        if (err) {
                                            console.log('Error updating user: ' + err);
                                            res.json({status: 'При обновлении записи произошла ошибка: ' + err});
                                        } else {
                                            collection.update({group: "Backend", "items.id": "b1"},
                                                {$set: {"items.$.counts": req.body.b1}},
                                                function (err, result) {
                                                    if (err) {
                                                        console.log('Error updating user: ' + err);
                                                        res.json({status: 'При обновлении записи произошла ошибка: ' + err});
                                                    } else {
                                                        collection.update({group: "Backend", "items.id": "b2"},
                                                            {$set: {"items.$.counts": req.body.b2}},
                                                            function (err, result) {
                                                                if (err) {
                                                                    console.log('Error updating user: ' + err);
                                                                    res.json({status: 'При обновлении записи произошла ошибка: ' + err});
                                                                } else {
                                                                    collection.update({group: "Backend", "items.id": "b3"},
                                                                        {$set: {"items.$.counts": req.body.b3}},
                                                                        function (err, result) {
                                                                            if (err) {
                                                                                console.log('Error updating user: ' + err);
                                                                                res.json({status: 'При обновлении записи произошла ошибка: ' + err});
                                                                            } else {
                                                                                collection.update({group: "Backend", "items.id": "b4"},
                                                                                    {$set: {"items.$.counts": req.body.b4}},
                                                                                    function (err, result) {
                                                                                        if (err) {
                                                                                            console.log('Error updating user: ' + err);
                                                                                            res.json({status: 'При обновлении записи произошла ошибка: ' + err});
                                                                                        } else {
                                                                                            collection.update({group: "WorkFlow", "items.id": "w1"},
                                                                                                {$set: {"items.$.counts": req.body.w1}},
                                                                                                function (err, result) {
                                                                                                    if (err) {
                                                                                                        console.log('Error updating user: ' + err);
                                                                                                        res.json({status: 'При обновлении записи произошла ошибка: ' + err});
                                                                                                    } else {
                                                                                                        collection.update({group: "WorkFlow", "items.id": "w2"},
                                                                                                            {$set: {"items.$.counts": req.body.w2}},
                                                                                                            function (err, result) {
                                                                                                                if (err) {
                                                                                                                    console.log('Error updating user: ' + err);
                                                                                                                    res.json({status: 'При обновлении записи произошла ошибка: ' + err});
                                                                                                                } else {
                                                                                                                    collection.update({group: "WorkFlow", "items.id": "w3"},
                                                                                                                        {$set: {"items.$.counts": req.body.w3}},
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
                                                                                        }
                                                                                    });
                                                                            }
                                                                        });
                                                                }
                                                            });
                                                    }
                                                });
                                        }
                                    });
                            }
                        });
                }
            });


    });
});


module.exports = router;