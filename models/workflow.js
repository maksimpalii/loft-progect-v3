'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WorkflowSchema = new Schema({
    group: {
        type: String
    },
    name: {
        type: String
    },
    counts: {
        type: String
    }
});

mongoose.model('workflow', WorkflowSchema);