'use strict';

//подключаем модули
const mongoose = require('mongoose'),
    readline = require('readline'),
    rl = readline.createInterface({input: process.stdin, output: process.stdout});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://loftportfolio:1q2w3e4r@ds123080.mlab.com:23080/inworldsloft');

//логин и пароль, изначально пустые
let name = '',
    counts = '';

//спрашиваем логин
rl.question('Название: ', answer => {
    //записываем введенный логин
    name = answer;

    //спрашиваем пароль
    rl.question('число: ', answer => {
        //записываем введенный пароль
        counts = answer;

        //завершаем ввод
        rl.close();
    });
});

//когда ввод будет завершен
rl.on('close', function()  {
    //подключаем модель пользователя
    //require('./models/frontend');
    require('./models/backend');

    //создаем экземпляр пользователя и указываем введенные данные
    //const Circle = mongoose.model('frontend'),
    const Circle = mongoose.model('backend'),
        circles = new Circle({name: name, counts: counts});

    //пытаемся найти пользователя с таким логином
    Circle
        .findOne({name: name})
        .then(u => {
            //если такой пользователь уже есть - сообщаем об этом
            if (u) {
                throw new Error('Такой пользователь уже существует!');
            }

            //если нет - добавляем пользователя в базу
            return circles.save();
        })
        .then(u => console.log('ok!'), e => console.error(e.message))
        .then(() => process.exit(0));
});
