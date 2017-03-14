'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const skillSchema = new Schema({
    group: {
        type: String
    },
    items: {
        type: Array
    }
});

mongoose.model('skills', skillSchema);