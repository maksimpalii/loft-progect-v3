const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../config.json');



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




router.get('/', isAdmin, function (req, res) {
    let obj = {
        title: "Панель администрирования",
        author: "Максим Палий",
        description: "Панель администрирования",
        keywords: "Панель администрирования",
        bodyClass: "page-admin"
    };
    //const Model2 = mongoose.model('frontend');
    const Model = mongoose.model('skills');
    //const Model3 = mongoose.model('backend');
    //const Model4 = mongoose.model('workflow');

    Model.find().then(function (skills) {
        obj.skills = skills;

        res.render('pages/admin', obj);
        });

});




//router.post('/', isAdmin, function (req, res) {
router.post('/', function (req, res) {
    let form = new formidable.IncomingForm();
    form.uploadDir = config.upload;
    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.json({status: 'Не удалось загрузить картинку'});
        }
        if (!fields.name) {
            return res.json({status: 'Укажите название проекта!'});
        }
        if (!fields.desc) {
            return res.json({status: 'Укажите технологии проекта!'});
        }
        if (!fields.plinks) {
            return res.json({status: 'Укажите ссылку на проект!'});
        }
        const Model = mongoose.model('pic');

        fs
            .rename(files.photo.path, path.join(config.upload, files.photo.name), function (err) {
                if (err) {
                    fs.unlink(path.join(config.upload, files.photo.name));
                    fs.rename(files.photo.path, files.photo.name);
                }
                let dir = config.upload.substr(config.upload.indexOf('/'));

                //const item = new Model({name: fields.name});
                const item = new Model({name: fields.name, desc: fields.desc, plinks: fields.plinks});
                item.save().then(pic => {
                    Model.update({_id: pic._id}, {$set: {picture: path.join(dir, files.photo.name)}}, {upsert: true})
                        .then(
                            i => res.json({status: 'Работа успешно загружена'}),
                            e => res.json({status: e.message})
                        );
                });

            });
    });
});


module.exports = router;