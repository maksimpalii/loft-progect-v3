const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/', function (req, res) {
    let obj = {
        title: 'Править запись бд'
    };
    res.render('pages/save', obj);
});

const isAdmin = (req, res, next) => {
    // если в сессии текущего пользователя есть пометка о том, что он является
    // администратором
    if (req.session.isAdmin) {
        //то всё хорошо :)
        return next();
    }
    //если нет, то перебросить пользователя на главную страницу сайта
    res.redirect('/');
};


router.post('/', isAdmin,  function (req, res) {
//router.post('/', function (req, res) {

     if (!req.body.f1 || !req.body.f2 || !req.body.f3 || !req.body.b1 || !req.body.b2 || !req.body.b3 || !req.body.b4 || !req.body.w1 || !req.body.w2 || !req.body.w3) {

         //если что-либо не указано - сообщаем об этом
         return res.json({status: 'Укажите данные!'});
     }

    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect("mongodb://loftportfolio:1q2w3e4r@ds123080.mlab.com:23080/inworldsloft", function (err, db) {

        var collection = db.collection('skills');
        var dbupdate = new Promise(function (resolve, reject) {
            collection.update({group: "Frontend", "items.id": "f1"},
                {$set: {"items.$.counts": req.body.f1}});
            resolve(1);
        });
        dbupdate.then(function (value) {
            collection.update({group: "Frontend", "items.id": "f2"},
                {$set: {"items.$.counts": req.body.f2}});
            return value;
        }).then(function (value) {
            collection.update({group: "Frontend", "items.id": "f3"},
                {$set: {"items.$.counts": req.body.f3}});
            return value;
        }).then(function (value) {
            collection.update({group: "Backend", "items.id": "b1"},
                {$set: {"items.$.counts": req.body.b1}});
            return value;
        }).then(function (value) {
            collection.update({group: "Backend", "items.id": "b2"},
                {$set: {"items.$.counts": req.body.b2}});
            return value;
        }).then(function (value) {
            collection.update({group: "Backend", "items.id": "b3"},
                {$set: {"items.$.counts": req.body.b3}});
            return value;
        }).then(function (value) {
            collection.update({group: "Backend", "items.id": "b4"},
                {$set: {"items.$.counts": req.body.b4}});
            return value;
        }).then(function (value) {
            collection.update({group: "WorkFlow", "items.id": "w1"},
                {$set: {"items.$.counts": req.body.w1}});
            return value;
        }).then(function (value) {
            collection.update({group: "WorkFlow", "items.id": "w2"},
                {$set: {"items.$.counts": req.body.w2}});
            return value;
        }).then(function (value) {
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
        }, function (reason) {
            console.log(reason); // Ошибка!
        });
    });
});


module.exports = router;