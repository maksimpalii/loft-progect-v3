'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BackendSchema = new Schema({
    "Frontend": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "counts": {
                    "type": "string"
                }
            }
        }
    },
    "Backend": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "counts": {
                    "type": "string"
                }
            }
        }
    },
    "WorkFlow": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "counts": {
                    "type": "string"
                }
            }
        }
    }
});

mongoose.model('backend', BackendSchema);