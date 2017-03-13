'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    PicSchema = new Schema({
        name: {
            type: String,
            required: [true, 'Укажите название проекта']
        },
        desc: {
            type: String,
            required: [true, 'Укажите технологии проекта']
        },
        plinks: {
            type: String,
            required: [true, 'Укажите ссылку на проект']
        },
        picture: {
            type: String
        }
    });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('pic', PicSchema);