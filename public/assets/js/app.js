'use strict';
var preloader = (function () {
    var percentsTotal = 0;
    var preloader = $('.preloader');
    var imgPath = $('*').map(function (ndx, element) {
        var background = $(element).css('background-image');
        var isImg = $(element).is('img');
        var path = '';
        if (background != 'none') {
            path = background.replace('url("', '').replace('")', '');
        }
        if (isImg) {
            path = $(element).attr('src');
        }
        if (path) return path;
    });

    var setPercents = function (total, current) {
        var percents = Math.ceil(current / total * 100);

        $('.loading-value').text(percents + '%');
        $('.big.circle').css({'stroke-dasharray': percents * 1.57 + ' ' + '157'});

        if (percents >= 100) {
            preloader.fadeOut();
        }
    }

    var loadImages = function (images) {

        if (!images.length) preloader.fadeOut();

        images.forEach(function (img, i, images) {
            var fakeImage = $('<img>', {
                attr: {
                    src: img
                }
            });

            fakeImage.on('load error', function () {
                percentsTotal++;
                setPercents(images.length, percentsTotal);
            });
        });

    }
    return {
        init: function () {
            var imgs = imgPath.toArray();
            loadImages(imgs);
            //console.log(imgs);
        }
    }
}());


var parallaxMouse = (function () {
    var parallaxContainer = document.querySelector('#parallax');
    if (parallaxContainer !== null) {
        var layer = parallaxContainer.lastElementChild;
        window.addEventListener('mousemove', function (e) {
            var pageX = e.pageX,
                pageY = e.pageY,
                initialX = (window.innerWidth / 2) - pageX,
                initialY = (window.innerHeight / 2) - pageY,
                positionX = initialX * 0.01,
                positionY = initialY * 0.01,
                layerStyle = layer.style,
                transformString = 'translate3d(' + positionX + 'px,' + positionY + 'px, 0)';
            layerStyle.transform = transformString;
        });
    }
});

var parallax = (function () {
    var bg = document.querySelector('.section-profile__bg');
    var stars = document.querySelector('.profile-container__bgicons');
    var info = document.querySelector('.profile-container__info');

    return {
        move: function (block, windowScroll, strafeAmount) {
            var strafe = windowScroll / -strafeAmount + '%';
            var transformString2 = 'translate3d(0,' + strafe + ', 0)';

            var style = block.style;

            style.transform = transformString2;
            style.webkitTransform = transformString2;
            style.msTransform = transformString2;
        },
        init: function (wScroll) {
            this.move(bg, wScroll, 45);
            this.move(stars, wScroll, 20);
            this.move(info, wScroll, 3);
        }
    }
}());


var menuBlog = (function () {
    var container = document.querySelector('.menu-blog-nav');
    if (container !== null) {
        var blogmenu = document.querySelector('.section-blog__menu');
        var menuState = false;

        container.addEventListener('click', function () {
            if (!menuState) {
                blogmenu.classList.add('active');
                menuState = true;
            }
            else {
                blogmenu.classList.remove('active');
                menuState = false;
            }
        });
    }
});
var boxFlip = (function () {
    var button = document.querySelector('.button_authorization');
    if (button !== null) {
        var signbox = document.querySelector('.flipper'),
            outbox = document.querySelector('.flip-out'),
            outbox2 = document.querySelector('.buttons-panel__item');
        button.addEventListener('click', function () {
            this.style.display = 'none';
            signbox.classList.add('flipped');
        });
        outbox.addEventListener('click', function () {
            button.style.display = 'block';
            signbox.classList.remove('flipped');
        });
        outbox2.addEventListener('click', function () {
            button.style.display = 'block';
            signbox.classList.remove('flipped');
        });
    }
});

var blur = (function () {
    var wrapper = document.querySelector('.form-works__bg'),
        form = document.querySelector('.form-works__bginn');
    return {
        set: function () {
            var imgWidth = document.querySelector('.section-speakme__background').offsetWidth,
                posLeft = -wrapper.offsetLeft,
                posTop = -wrapper.offsetTop,
                blurCSS = form.style;

            blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
            blurCSS.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';
        }
    }

}());


var navmainmenu = (function () {
    var menu = document.querySelector('.main-menu'),
        gamb = document.querySelector('.menu-hamburger');
    return {
        set: function () {
            if (gamb !== null) {
                gamb.addEventListener('click', function () {
                    this.classList.toggle('menu-hamburger_active');
                    menu.classList.toggle('main-menu_active');
                });

            }
        }
    }
}());

const scrollDown = document.querySelector('.scroll-down');
const scrollUp = document.querySelector('.scroll-up');
if (scrollDown) {
        $(scrollDown).on("click", function (event) {
            event.preventDefault();
            var id  = $(this).attr('href'),
                top = $(id).offset().top;
            $('body,html').animate({scrollTop: top}, 1000);
        });
}
if (scrollUp) {
    $(scrollUp).on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });
}

//--- start

const formUpload = document.querySelector('#upload');

function fileUpload(url, data, cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    xhr.onload = function (e) {
        let result = JSON.parse(xhr.responseText);
        cb(result.status);
    };

    xhr.send(data);
}

function prepareSendFile(e) {
    e.preventDefault();
    let resultContainer = document.querySelector('#upload .status');
    let formData = new FormData();
    let file = document
        .querySelector('#file-select')
        .files[0];
    let name = document
        .querySelector('#file-name')
        .value;
    let desc = document
        .querySelector('#file-desc')
        .value;
    let plinks = document
        .querySelector('#file-plinks')
        .value;


    formData.append('photo', file, file.name);
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('plinks', plinks);

    resultContainer.innerHTML = 'Uploading...';
    fileUpload('/admin', formData, function (data) {
        resultContainer.innerHTML = data;

        if (data == 'Работа успешно загружена'){
            formUpload.reset();
        }
    });
}

if (formUpload) {
    formUpload.addEventListener('submit', prepareSendFile);
}

// addblogpost
const formBlog = document.querySelector('#blog');

if (formBlog) {
    formBlog.addEventListener('submit', prepareSendPost);
}

function prepareSendPost(e) {
    e.preventDefault();
    let resultContainer = document.querySelector('#blog .status');
    let data = {
        title: formBlog.title.value,
        date: formBlog.date.value,
        text: formBlog.text.value
    };
    resultContainer.innerHTML = 'Sending...';
    sendAjaxJson('/addpost', data, function (data) {
        resultContainer.innerHTML = data;
        if (data == 'Запись успешно добавлена'){
            formBlog.reset();
        }
    });
}

//---- block Blog

//const formLogin = document.querySelector('#login');
const formLogin = document.querySelector('#logInForm');

if (formLogin) {
    formLogin.addEventListener('submit', prepareAuth);
}

function prepareAuth(e) {
    e.preventDefault();
    let resultContainer = document.querySelector('#logInForm .status');
    let data = {
        login: formLogin.login.value,
        password: formLogin.password.value
    };
    resultContainer.innerHTML = 'Sending...';
    sendAjaxJson('/login', data, function (data) {
        resultContainer.innerHTML = data;
        if(data == "Авторизация успешна!"){
            console.log("done");
            document.location.href = '/admin';
        }
    });
}


//---end


// ---save
const formAbout = document.querySelector('#about');

if (formAbout) {
    formAbout.addEventListener('submit', prepareSave);
}

function prepareSave(e) {
    e.preventDefault();
    let resultContainer = document.querySelector('#about .status');
    let data = {
       f1: formAbout.f1.value,
        f2: formAbout.f2.value,
        f3: formAbout.f3.value,
        b1: formAbout.b1.value,
        b2: formAbout.b2.value,
        b3: formAbout.b3.value,
        b4: formAbout.b4.value,
        w1: formAbout.w1.value,
        w2: formAbout.w2.value,
        w3: formAbout.w3.value
    };
    resultContainer.innerHTML = 'Sending...';
    sendAjaxJson('/save', data, function (data) {
        resultContainer.innerHTML = data;
    });
}

// ---save end


//admin


//admin end


//------------ block mail
const formMail = document.querySelector('#mail');

if (formMail) {
    formMail.addEventListener('submit', prepareSendMail);
    formMail.addEventListener('reset', clearSendMail);

}
function clearSendMail() {
    formMail.reset();
};


function prepareSendMail(e) {
    e.preventDefault();
    let resultContainer = document.querySelector('.status');
    let data = {
        name: formMail.name.value,
        email: formMail.email.value,
        text: formMail.message.value
    };
    resultContainer.innerHTML = 'Sending...';
    sendAjaxJson('/works', data, function (data) {
        resultContainer.innerHTML = data;
        if (data == 'Письмо успешно отправлено'){
            clearSendMail();
        }
    });
}


function sendAjaxJson(url, data, cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        let result = JSON.parse(xhr.responseText);
        cb(result.status);

    };
    xhr.send(JSON.stringify(data));
}


navmainmenu.set();
parallaxMouse();
boxFlip();
menuBlog();
//blur.set();


var blogscontent = document.querySelector('.section-blog__content');

if (blogscontent){
    var  menuOffsetTop = $('.section-blog__list').offset().top;
    $(document).scroll(function () {
        if ($(document).scrollTop() >= menuOffsetTop && $(window).width() > 753){
            $('.section-blog__list').addClass('fixed-position');
        } else {
            $('.section-blog__list').removeClass('fixed-position');
        }


        $(".section-blog__post").each(function () {
            if (($(document).scrollTop() - $(this).offset().top) >= 0){
                $(".section-blog__item").each(function () {
                    $(this).removeClass('section-blog__item--active');

                });
                var currentLink = $(".articles__link[href=\'#" + $(this).attr('id') + "\']");
                currentLink.parent().addClass('section-blog__item--active');
            }
        });
    });

    $(".articles__link").on("click", function (event) {
        event.preventDefault();
        var ids  = $(this).attr('href'),
            topsb = $(ids).offset().top;
        $('body,html').animate({scrollTop: topsb}, 1000);
    });
}

window.onresize = function () {
    // blur.set();

};
window.onscroll = function () {
    var wScroll = window.pageYOffset;
    parallax.init(wScroll);

    var circabout = document.querySelector('.page-about');

    if (circabout){
        var tops = $('.about-skills').offset().top;
        var tops2 = document.querySelector('#about').offsetParent.scrollTop;
        //console.log(tops + "-" +  wScroll + "," + tops2);
        if (tops2 >= tops){
            circles();
        }
    }
}



function circles(){

    var skinfo = document.querySelectorAll('.skills-info__circle');
    var skname = document.querySelectorAll('.skills-info__name');
    var sktitle = document.querySelectorAll('.skills-info__title');

    for (var i = 0; i <= sktitle.length; i++){
        $(sktitle[i]).removeClass("not-active");
    }
    for (var i = 0; i <= skinfo.length; i++){
            $(skinfo[i]).removeClass("not-active");
    }
    for (var i = 0; i <= skname.length; i++){
        $(skname[i]).removeClass("not-active");
    }
}

preloader.init();
var slact = document.querySelector('.slider-main');
if (slact){
    $(".slider-info li:nth-child(1)" ).addClass('active');
    $(".slider-imgs__box li:nth-child(1)" ).addClass('active');
    $(".slider-imgs__down li:nth-last-child(1)" ).addClass('active');
    $(".slider-imgs__up li:nth-child(2)" ).addClass('active');


}

var slider = (function () {
    var counter = 0,
        duration = 300,
        inProcess = false;

    var moveSlideDesc = function (container, direction) {
        var items = $('.slider-info__box', container),
            activeItem = items.filter('.active'),
            direction = direction == 'display' ? "none" : "block";
        if (counter >= items.length) counter = 0;

        var reqItem = items.eq(counter);

        activeItem.animate({
            'opacity': direction
        }, duration);

        reqItem.animate({
            'opacity': direction
        }, duration, function () {
            activeItem.removeClass('active').css('opacity', direction);
            $(this).addClass('active');
            inProcess = false;

        });
    };

    var moveSlideMain = function (container, direction) {
        var items = $('.slider-imgs__list-item', container),
            activeItem = items.filter('.active'),
            direction = direction == 'opacity' ? 0 : 1;
        if (counter >= items.length) counter = 0;

        var reqItem = items.eq(counter);

        activeItem.animate({
            'opacity': direction
        }, duration);

        reqItem.animate({
            'opacity': '1'
        }, duration, function () {
            activeItem.removeClass('active').css('opacity', direction);
            $(this).addClass('active');
            inProcess = false;

        });
    };


    var moveSlideDown = function (container, direction) {
        var items = $('.slider-imgs__list-item', container),
            activeItem = items.filter('.active'),
            direction = direction == 'down' ? 100 : -100;

        if (counter <= -items.length) counter = 0;
        var reqItem = items.eq(counter - 1);

        activeItem.animate({
            'top': direction + '%'
        }, duration);

        reqItem.animate({
            'top': '0'
        }, duration, function () {
            activeItem.removeClass('active').css('top', -direction + '%');
            $(this).addClass('active');
            inProcess = false;
        });
    };
    var moveSlideUp = function (container, direction) {
        var items = $('.slider-imgs__list-item', container),
            activeItem = items.filter('.active'),
            direction = direction == 'down' ? 100 : -100;

        if (counter >= items.length - 1) counter = -1;
        var reqItem = items.eq(counter + 1);

        activeItem.animate({
            'top': direction + '%'
        }, duration);

        reqItem.animate({
            'top': '0'
        }, duration, function () {
            activeItem.removeClass('active').css('top', -direction + '%');
            $(this).addClass('active');
            inProcess = false;
        });
    };


    return {
        init: function () {

            $('.slider-imgs__up').on('click', function (e) {

                e.preventDefault();
//counter++;
                if (!inProcess) {
                    inProcess = true;
                    counter++;
                    moveSlideDesc($('.slider-info'), 'block');
                    moveSlideMain($('.slider-imgs__box'), 'opacity');
                    moveSlideDown($('.slider-imgs__down'), 'down');
                    moveSlideUp($('.slider-imgs__up'), 'up');
                }
                //counter++;
            });
            $('.slider-imgs__down').on('click', function (e) {
                e.preventDefault();

                //counter--;
                if (!inProcess) {
                    inProcess = true;
                    counter--;
                    moveSlideDesc($('.slider-info'), 'block');
                    moveSlideMain($('.slider-imgs__box'), 'opacity');
                    moveSlideUp($('.slider-imgs__up'), 'up');
                    moveSlideDown($('.slider-imgs__down'), 'down');
                }
            });
        }
    }
}());
slider.init();






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG52YXIgcHJlbG9hZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMDtcclxuICAgIHZhciBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XHJcbiAgICB2YXIgaW1nUGF0aCA9ICQoJyonKS5tYXAoZnVuY3Rpb24gKG5keCwgZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBiYWNrZ3JvdW5kID0gJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKTtcclxuICAgICAgICB2YXIgaXNJbWcgPSAkKGVsZW1lbnQpLmlzKCdpbWcnKTtcclxuICAgICAgICB2YXIgcGF0aCA9ICcnO1xyXG4gICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xyXG4gICAgICAgICAgICBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNJbWcpIHtcclxuICAgICAgICAgICAgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXRoKSByZXR1cm4gcGF0aDtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBzZXRQZXJjZW50cyA9IGZ1bmN0aW9uICh0b3RhbCwgY3VycmVudCkge1xyXG4gICAgICAgIHZhciBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG5cclxuICAgICAgICAkKCcubG9hZGluZy12YWx1ZScpLnRleHQocGVyY2VudHMgKyAnJScpO1xyXG4gICAgICAgICQoJy5iaWcuY2lyY2xlJykuY3NzKHsnc3Ryb2tlLWRhc2hhcnJheSc6IHBlcmNlbnRzICogMS41NyArICcgJyArICcxNTcnfSk7XHJcblxyXG4gICAgICAgIGlmIChwZXJjZW50cyA+PSAxMDApIHtcclxuICAgICAgICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxvYWRJbWFnZXMgPSBmdW5jdGlvbiAoaW1hZ2VzKSB7XHJcblxyXG4gICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKGltZywgaSwgaW1hZ2VzKSB7XHJcbiAgICAgICAgICAgIHZhciBmYWtlSW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgICAgICAgICBzcmM6IGltZ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGltZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcclxuICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpbWdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcblxyXG5cclxudmFyIHBhcmFsbGF4TW91c2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmFsbGF4Jyk7XHJcbiAgICBpZiAocGFyYWxsYXhDb250YWluZXIgIT09IG51bGwpIHtcclxuICAgICAgICB2YXIgbGF5ZXIgPSBwYXJhbGxheENvbnRhaW5lci5sYXN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgcGFnZVggPSBlLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWCA9IGluaXRpYWxYICogMC4wMSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWSA9IGluaXRpYWxZICogMC4wMSxcclxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgnICsgcG9zaXRpb25YICsgJ3B4LCcgKyBwb3NpdGlvblkgKyAncHgsIDApJztcclxuICAgICAgICAgICAgbGF5ZXJTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxudmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLXByb2ZpbGVfX2JnJyk7XHJcbiAgICB2YXIgc3RhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZS1jb250YWluZXJfX2JnaWNvbnMnKTtcclxuICAgIHZhciBpbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGUtY29udGFpbmVyX19pbmZvJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICAgICAgICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nMiA9ICd0cmFuc2xhdGUzZCgwLCcgKyBzdHJhZmUgKyAnLCAwKSc7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuXHJcbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZzI7XHJcbiAgICAgICAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZzI7XHJcbiAgICAgICAgICAgIHN0eWxlLm1zVHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nMjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUoc3RhcnMsIHdTY3JvbGwsIDIwKTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKGluZm8sIHdTY3JvbGwsIDMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxuXHJcblxyXG52YXIgbWVudUJsb2cgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJsb2ctbmF2Jyk7XHJcbiAgICBpZiAoY29udGFpbmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgdmFyIGJsb2dtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tYmxvZ19fbWVudScpO1xyXG4gICAgICAgIHZhciBtZW51U3RhdGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIW1lbnVTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgYmxvZ21lbnUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtZW51U3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmxvZ21lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtZW51U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxudmFyIGJveEZsaXAgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b25fYXV0aG9yaXphdGlvbicpO1xyXG4gICAgaWYgKGJ1dHRvbiAhPT0gbnVsbCkge1xyXG4gICAgICAgIHZhciBzaWduYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXBwZXInKSxcclxuICAgICAgICAgICAgb3V0Ym94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXAtb3V0JyksXHJcbiAgICAgICAgICAgIG91dGJveDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9ucy1wYW5lbF9faXRlbScpO1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBzaWduYm94LmNsYXNzTGlzdC5hZGQoJ2ZsaXBwZWQnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBvdXRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgc2lnbmJveC5jbGFzc0xpc3QucmVtb3ZlKCdmbGlwcGVkJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgb3V0Ym94Mi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBzaWduYm94LmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXBwZWQnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG52YXIgYmx1ciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXdvcmtzX19iZycpLFxyXG4gICAgICAgIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS13b3Jrc19fYmdpbm4nKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbWdXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLXNwZWFrbWVfX2JhY2tncm91bmQnKS5vZmZzZXRXaWR0aCxcclxuICAgICAgICAgICAgICAgIHBvc0xlZnQgPSAtd3JhcHBlci5vZmZzZXRMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zVG9wID0gLXdyYXBwZXIub2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICAgICAgYmx1ckNTUyA9IGZvcm0uc3R5bGU7XHJcblxyXG4gICAgICAgICAgICBibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgJ2F1dG8nO1xyXG4gICAgICAgICAgICBibHVyQ1NTLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KCkpO1xyXG5cclxuXHJcbnZhciBuYXZtYWlubWVudSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW1lbnUnKSxcclxuICAgICAgICBnYW1iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtaGFtYnVyZ2VyJyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoZ2FtYiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZ2FtYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ21lbnUtaGFtYnVyZ2VyX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnbWFpbi1tZW51X2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG5cclxuY29uc3Qgc2Nyb2xsRG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtZG93bicpO1xyXG5jb25zdCBzY3JvbGxVcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtdXAnKTtcclxuaWYgKHNjcm9sbERvd24pIHtcclxuICAgICAgICAkKHNjcm9sbERvd24pLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBpZCAgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKSxcclxuICAgICAgICAgICAgICAgIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCAxMDAwKTtcclxuICAgICAgICB9KTtcclxufVxyXG5pZiAoc2Nyb2xsVXApIHtcclxuICAgICQoc2Nyb2xsVXApLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgaWQgID0gJCh0aGlzKS5hdHRyKCdocmVmJyksXHJcbiAgICAgICAgICAgIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHRvcH0sIDEwMDApO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vLS0tIHN0YXJ0XHJcblxyXG5jb25zdCBmb3JtVXBsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZCcpO1xyXG5cclxuZnVuY3Rpb24gZmlsZVVwbG9hZCh1cmwsIGRhdGEsIGNiKSB7XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XHJcblxyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgY2IocmVzdWx0LnN0YXR1cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHhoci5zZW5kKGRhdGEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVwYXJlU2VuZEZpbGUoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWQgLnN0YXR1cycpO1xyXG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBsZXQgZmlsZSA9IGRvY3VtZW50XHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXNlbGVjdCcpXHJcbiAgICAgICAgLmZpbGVzWzBdO1xyXG4gICAgbGV0IG5hbWUgPSBkb2N1bWVudFxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1uYW1lJylcclxuICAgICAgICAudmFsdWU7XHJcbiAgICBsZXQgZGVzYyA9IGRvY3VtZW50XHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLWRlc2MnKVxyXG4gICAgICAgIC52YWx1ZTtcclxuICAgIGxldCBwbGlua3MgPSBkb2N1bWVudFxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1wbGlua3MnKVxyXG4gICAgICAgIC52YWx1ZTtcclxuXHJcblxyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdwaG90bycsIGZpbGUsIGZpbGUubmFtZSk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ25hbWUnLCBuYW1lKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnZGVzYycsIGRlc2MpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdwbGlua3MnLCBwbGlua3MpO1xyXG5cclxuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnVXBsb2FkaW5nLi4uJztcclxuICAgIGZpbGVVcGxvYWQoJy9hZG1pbicsIGZvcm1EYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xyXG5cclxuICAgICAgICBpZiAoZGF0YSA9PSAn0KDQsNCx0L7RgtCwINGD0YHQv9C10YjQvdC+INC30LDQs9GA0YPQttC10L3QsCcpe1xyXG4gICAgICAgICAgICBmb3JtVXBsb2FkLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmlmIChmb3JtVXBsb2FkKSB7XHJcbiAgICBmb3JtVXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kRmlsZSk7XHJcbn1cclxuXHJcbi8vIGFkZGJsb2dwb3N0XHJcbmNvbnN0IGZvcm1CbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cnKTtcclxuXHJcbmlmIChmb3JtQmxvZykge1xyXG4gICAgZm9ybUJsb2cuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRQb3N0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZVNlbmRQb3N0KGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxvZyAuc3RhdHVzJyk7XHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICB0aXRsZTogZm9ybUJsb2cudGl0bGUudmFsdWUsXHJcbiAgICAgICAgZGF0ZTogZm9ybUJsb2cuZGF0ZS52YWx1ZSxcclxuICAgICAgICB0ZXh0OiBmb3JtQmxvZy50ZXh0LnZhbHVlXHJcbiAgICB9O1xyXG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcclxuICAgIHNlbmRBamF4SnNvbignL2FkZHBvc3QnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xyXG4gICAgICAgIGlmIChkYXRhID09ICfQl9Cw0L/QuNGB0Ywg0YPRgdC/0LXRiNC90L4g0LTQvtCx0LDQstC70LXQvdCwJyl7XHJcbiAgICAgICAgICAgIGZvcm1CbG9nLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vLS0tLSBibG9jayBCbG9nXHJcblxyXG4vL2NvbnN0IGZvcm1Mb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbicpO1xyXG5jb25zdCBmb3JtTG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9nSW5Gb3JtJyk7XHJcblxyXG5pZiAoZm9ybUxvZ2luKSB7XHJcbiAgICBmb3JtTG9naW4uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZUF1dGgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVwYXJlQXV0aChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ0luRm9ybSAuc3RhdHVzJyk7XHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICBsb2dpbjogZm9ybUxvZ2luLmxvZ2luLnZhbHVlLFxyXG4gICAgICAgIHBhc3N3b3JkOiBmb3JtTG9naW4ucGFzc3dvcmQudmFsdWVcclxuICAgIH07XHJcbiAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1NlbmRpbmcuLi4nO1xyXG4gICAgc2VuZEFqYXhKc29uKCcvbG9naW4nLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xyXG4gICAgICAgIGlmKGRhdGEgPT0gXCLQkNCy0YLQvtGA0LjQt9Cw0YbQuNGPINGD0YHQv9C10YjQvdCwIVwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkb25lXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gJy9hZG1pbic7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG4vLy0tLWVuZFxyXG5cclxuXHJcbi8vIC0tLXNhdmVcclxuY29uc3QgZm9ybUFib3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fib3V0Jyk7XHJcblxyXG5pZiAoZm9ybUFib3V0KSB7XHJcbiAgICBmb3JtQWJvdXQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNhdmUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVwYXJlU2F2ZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fib3V0IC5zdGF0dXMnKTtcclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgZjE6IGZvcm1BYm91dC5mMS52YWx1ZSxcclxuICAgICAgICBmMjogZm9ybUFib3V0LmYyLnZhbHVlLFxyXG4gICAgICAgIGYzOiBmb3JtQWJvdXQuZjMudmFsdWUsXHJcbiAgICAgICAgYjE6IGZvcm1BYm91dC5iMS52YWx1ZSxcclxuICAgICAgICBiMjogZm9ybUFib3V0LmIyLnZhbHVlLFxyXG4gICAgICAgIGIzOiBmb3JtQWJvdXQuYjMudmFsdWUsXHJcbiAgICAgICAgYjQ6IGZvcm1BYm91dC5iNC52YWx1ZSxcclxuICAgICAgICB3MTogZm9ybUFib3V0LncxLnZhbHVlLFxyXG4gICAgICAgIHcyOiBmb3JtQWJvdXQudzIudmFsdWUsXHJcbiAgICAgICAgdzM6IGZvcm1BYm91dC53My52YWx1ZVxyXG4gICAgfTtcclxuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XHJcbiAgICBzZW5kQWpheEpzb24oJy9zYXZlJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyAtLS1zYXZlIGVuZFxyXG5cclxuXHJcbi8vYWRtaW5cclxuXHJcblxyXG4vL2FkbWluIGVuZFxyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tIGJsb2NrIG1haWxcclxuY29uc3QgZm9ybU1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbCcpO1xyXG5cclxuaWYgKGZvcm1NYWlsKSB7XHJcbiAgICBmb3JtTWFpbC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZE1haWwpO1xyXG4gICAgZm9ybU1haWwuYWRkRXZlbnRMaXN0ZW5lcigncmVzZXQnLCBjbGVhclNlbmRNYWlsKTtcclxuXHJcbn1cclxuZnVuY3Rpb24gY2xlYXJTZW5kTWFpbCgpIHtcclxuICAgIGZvcm1NYWlsLnJlc2V0KCk7XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZVNlbmRNYWlsKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICBuYW1lOiBmb3JtTWFpbC5uYW1lLnZhbHVlLFxyXG4gICAgICAgIGVtYWlsOiBmb3JtTWFpbC5lbWFpbC52YWx1ZSxcclxuICAgICAgICB0ZXh0OiBmb3JtTWFpbC5tZXNzYWdlLnZhbHVlXHJcbiAgICB9O1xyXG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcclxuICAgIHNlbmRBamF4SnNvbignL3dvcmtzJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcclxuICAgICAgICBpZiAoZGF0YSA9PSAn0J/QuNGB0YzQvNC+INGD0YHQv9C10YjQvdC+INC+0YLQv9GA0LDQstC70LXQvdC+Jyl7XHJcbiAgICAgICAgICAgIGNsZWFyU2VuZE1haWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNlbmRBamF4SnNvbih1cmwsIGRhdGEsIGNiKSB7XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xyXG5cclxuICAgIH07XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbn1cclxuXHJcblxyXG5uYXZtYWlubWVudS5zZXQoKTtcclxucGFyYWxsYXhNb3VzZSgpO1xyXG5ib3hGbGlwKCk7XHJcbm1lbnVCbG9nKCk7XHJcbi8vYmx1ci5zZXQoKTtcclxuXHJcblxyXG52YXIgYmxvZ3Njb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tYmxvZ19fY29udGVudCcpO1xyXG5cclxuaWYgKGJsb2dzY29udGVudCl7XHJcbiAgICB2YXIgIG1lbnVPZmZzZXRUb3AgPSAkKCcuc2VjdGlvbi1ibG9nX19saXN0Jykub2Zmc2V0KCkudG9wO1xyXG4gICAgJChkb2N1bWVudCkuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPj0gbWVudU9mZnNldFRvcCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc1Myl7XHJcbiAgICAgICAgICAgICQoJy5zZWN0aW9uLWJsb2dfX2xpc3QnKS5hZGRDbGFzcygnZml4ZWQtcG9zaXRpb24nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuc2VjdGlvbi1ibG9nX19saXN0JykucmVtb3ZlQ2xhc3MoJ2ZpeGVkLXBvc2l0aW9uJyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgJChcIi5zZWN0aW9uLWJsb2dfX3Bvc3RcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgLSAkKHRoaXMpLm9mZnNldCgpLnRvcCkgPj0gMCl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnNlY3Rpb24tYmxvZ19faXRlbVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdzZWN0aW9uLWJsb2dfX2l0ZW0tLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRMaW5rID0gJChcIi5hcnRpY2xlc19fbGlua1tocmVmPVxcJyNcIiArICQodGhpcykuYXR0cignaWQnKSArIFwiXFwnXVwiKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRMaW5rLnBhcmVudCgpLmFkZENsYXNzKCdzZWN0aW9uLWJsb2dfX2l0ZW0tLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmFydGljbGVzX19saW5rXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgaWRzICA9ICQodGhpcykuYXR0cignaHJlZicpLFxyXG4gICAgICAgICAgICB0b3BzYiA9ICQoaWRzKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3BzYn0sIDEwMDApO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbndpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGJsdXIuc2V0KCk7XHJcblxyXG59O1xyXG53aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgIHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcblxyXG4gICAgdmFyIGNpcmNhYm91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWFib3V0Jyk7XHJcblxyXG4gICAgaWYgKGNpcmNhYm91dCl7XHJcbiAgICAgICAgdmFyIHRvcHMgPSAkKCcuYWJvdXQtc2tpbGxzJykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIHZhciB0b3BzMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhYm91dCcpLm9mZnNldFBhcmVudC5zY3JvbGxUb3A7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0b3BzICsgXCItXCIgKyAgd1Njcm9sbCArIFwiLFwiICsgdG9wczIpO1xyXG4gICAgICAgIGlmICh0b3BzMiA+PSB0b3BzKXtcclxuICAgICAgICAgICAgY2lyY2xlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBjaXJjbGVzKCl7XHJcblxyXG4gICAgdmFyIHNraW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbHMtaW5mb19fY2lyY2xlJyk7XHJcbiAgICB2YXIgc2tuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNraWxscy1pbmZvX19uYW1lJyk7XHJcbiAgICB2YXIgc2t0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbHMtaW5mb19fdGl0bGUnKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBza3RpdGxlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAkKHNrdGl0bGVbaV0pLnJlbW92ZUNsYXNzKFwibm90LWFjdGl2ZVwiKTtcclxuICAgIH1cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHNraW5mby5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICQoc2tpbmZvW2ldKS5yZW1vdmVDbGFzcyhcIm5vdC1hY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBza25hbWUubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICQoc2tuYW1lW2ldKS5yZW1vdmVDbGFzcyhcIm5vdC1hY3RpdmVcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbnByZWxvYWRlci5pbml0KCk7XHJcbnZhciBzbGFjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItbWFpbicpO1xyXG5pZiAoc2xhY3Qpe1xyXG4gICAgJChcIi5zbGlkZXItaW5mbyBsaTpudGgtY2hpbGQoMSlcIiApLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICQoXCIuc2xpZGVyLWltZ3NfX2JveCBsaTpudGgtY2hpbGQoMSlcIiApLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICQoXCIuc2xpZGVyLWltZ3NfX2Rvd24gbGk6bnRoLWxhc3QtY2hpbGQoMSlcIiApLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICQoXCIuc2xpZGVyLWltZ3NfX3VwIGxpOm50aC1jaGlsZCgyKVwiICkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHJcbn1cclxuXHJcbnZhciBzbGlkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNvdW50ZXIgPSAwLFxyXG4gICAgICAgIGR1cmF0aW9uID0gMzAwLFxyXG4gICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgIHZhciBtb3ZlU2xpZGVEZXNjID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gJCgnLnNsaWRlci1pbmZvX19ib3gnLCBjb250YWluZXIpLFxyXG4gICAgICAgICAgICBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcuYWN0aXZlJyksXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PSAnZGlzcGxheScgPyBcIm5vbmVcIiA6IFwiYmxvY2tcIjtcclxuICAgICAgICBpZiAoY291bnRlciA+PSBpdGVtcy5sZW5ndGgpIGNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGNvdW50ZXIpO1xyXG5cclxuICAgICAgICBhY3RpdmVJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAnb3BhY2l0eSc6IGRpcmVjdGlvblxyXG4gICAgICAgIH0sIGR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgcmVxSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ29wYWNpdHknOiBkaXJlY3Rpb25cclxuICAgICAgICB9LCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5jc3MoJ29wYWNpdHknLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgaW5Qcm9jZXNzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgbW92ZVNsaWRlTWFpbiA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRpcmVjdGlvbikge1xyXG4gICAgICAgIHZhciBpdGVtcyA9ICQoJy5zbGlkZXItaW1nc19fbGlzdC1pdGVtJywgY29udGFpbmVyKSxcclxuICAgICAgICAgICAgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT0gJ29wYWNpdHknID8gMCA6IDE7XHJcbiAgICAgICAgaWYgKGNvdW50ZXIgPj0gaXRlbXMubGVuZ3RoKSBjb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShjb3VudGVyKTtcclxuXHJcbiAgICAgICAgYWN0aXZlSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ29wYWNpdHknOiBkaXJlY3Rpb25cclxuICAgICAgICB9LCBkdXJhdGlvbik7XHJcblxyXG4gICAgICAgIHJlcUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICdvcGFjaXR5JzogJzEnXHJcbiAgICAgICAgfSwgZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgYWN0aXZlSXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJykuY3NzKCdvcGFjaXR5JywgZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHZhciBtb3ZlU2xpZGVEb3duID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gJCgnLnNsaWRlci1pbWdzX19saXN0LWl0ZW0nLCBjb250YWluZXIpLFxyXG4gICAgICAgICAgICBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcuYWN0aXZlJyksXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PSAnZG93bicgPyAxMDAgOiAtMTAwO1xyXG5cclxuICAgICAgICBpZiAoY291bnRlciA8PSAtaXRlbXMubGVuZ3RoKSBjb3VudGVyID0gMDtcclxuICAgICAgICB2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGNvdW50ZXIgLSAxKTtcclxuXHJcbiAgICAgICAgYWN0aXZlSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ3RvcCc6IGRpcmVjdGlvbiArICclJ1xyXG4gICAgICAgIH0sIGR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgcmVxSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ3RvcCc6ICcwJ1xyXG4gICAgICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmNzcygndG9wJywgLWRpcmVjdGlvbiArICclJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB2YXIgbW92ZVNsaWRlVXAgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBkaXJlY3Rpb24pIHtcclxuICAgICAgICB2YXIgaXRlbXMgPSAkKCcuc2xpZGVyLWltZ3NfX2xpc3QtaXRlbScsIGNvbnRhaW5lciksXHJcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5hY3RpdmUnKSxcclxuICAgICAgICAgICAgZGlyZWN0aW9uID0gZGlyZWN0aW9uID09ICdkb3duJyA/IDEwMCA6IC0xMDA7XHJcblxyXG4gICAgICAgIGlmIChjb3VudGVyID49IGl0ZW1zLmxlbmd0aCAtIDEpIGNvdW50ZXIgPSAtMTtcclxuICAgICAgICB2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGNvdW50ZXIgKyAxKTtcclxuXHJcbiAgICAgICAgYWN0aXZlSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ3RvcCc6IGRpcmVjdGlvbiArICclJ1xyXG4gICAgICAgIH0sIGR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgcmVxSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ3RvcCc6ICcwJ1xyXG4gICAgICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmNzcygndG9wJywgLWRpcmVjdGlvbiArICclJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLnNsaWRlci1pbWdzX191cCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vL2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5Qcm9jZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlRGVzYygkKCcuc2xpZGVyLWluZm8nKSwgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlTWFpbigkKCcuc2xpZGVyLWltZ3NfX2JveCcpLCAnb3BhY2l0eScpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZURvd24oJCgnLnNsaWRlci1pbWdzX19kb3duJyksICdkb3duJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlVXAoJCgnLnNsaWRlci1pbWdzX191cCcpLCAndXAnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY291bnRlcisrO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJCgnLnNsaWRlci1pbWdzX19kb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvdW50ZXItLTtcclxuICAgICAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5Qcm9jZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyLS07XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlRGVzYygkKCcuc2xpZGVyLWluZm8nKSwgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlTWFpbigkKCcuc2xpZGVyLWltZ3NfX2JveCcpLCAnb3BhY2l0eScpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZVVwKCQoJy5zbGlkZXItaW1nc19fdXAnKSwgJ3VwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlRG93bigkKCcuc2xpZGVyLWltZ3NfX2Rvd24nKSwgJ2Rvd24nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG5zbGlkZXIuaW5pdCgpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==
