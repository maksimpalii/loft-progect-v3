'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FrontendSchema = new Schema({
    name: {
        type: String
    },
    counts: {
        type: String
    }
});

mongoose.model('frontend', FrontendSchema);