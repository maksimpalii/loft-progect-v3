const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const article = require('../source/data/article');

router.get('/', function (req, res) {
    let obj = {
        title: "Blog",
        author: "Максим Палий",
        description: "описание блога",
        keywords: "ключевые слова блога",
        bodyClass: "page-blog"
    };
    const Model = mongoose.model('blog');

    Model.find().then(function (items) {
        Object.assign(obj, {items: items});
        res.render('pages/blog', obj);
    });

});

module.exports = router;