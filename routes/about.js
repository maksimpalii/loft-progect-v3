const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const article = require('../source/data/circles');

router.get('/', function (req, res) {
    let obj = {
        title: "Portfolio",
        author: "Максим Палий",
        description: "описание портфолио",
        keywords: "ключевые слова портфолио",
        bodyClass: "page-about"
    };
    const Model = mongoose.model('skills');
    Model.find().then(function (skills) {
        obj.skills = skills;
    res.render('pages/about', obj);
    });
});

module.exports = router;