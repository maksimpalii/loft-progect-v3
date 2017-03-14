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
    //  formData.append('name', name, desc, plinks);

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
        HTML5: formAbout.HTML5.value,
        CSS3: formAbout.CSS3.value,
        JavaScript: formAbout.JavaScript.value,
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
function clearPostForm() {
    var formBlog = document.querySelector('#blog');
    if (formBlog) {
        formBlog.reset();
    }

}

function sendAjaxJson(url, data, cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        let result = JSON.parse(xhr.responseText);
        cb(result.status);
        //clearPostForm();
    };
    xhr.send(JSON.stringify(data));
}


navmainmenu.set();
parallaxMouse();
boxFlip();
menuBlog();
//blur.set();

window.onresize = function () {
    // blur.set();
}
window.onscroll = function () {
    var wScroll = window.pageYOffset;
    parallax.init(wScroll);
}
preloader.init();

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






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcbnZhciBwcmVsb2FkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHBlcmNlbnRzVG90YWwgPSAwO1xyXG4gICAgdmFyIHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKTtcclxuICAgIHZhciBpbWdQYXRoID0gJCgnKicpLm1hcChmdW5jdGlvbiAobmR4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIGJhY2tncm91bmQgPSAkKGVsZW1lbnQpLmNzcygnYmFja2dyb3VuZC1pbWFnZScpO1xyXG4gICAgICAgIHZhciBpc0ltZyA9ICQoZWxlbWVudCkuaXMoJ2ltZycpO1xyXG4gICAgICAgIHZhciBwYXRoID0gJyc7XHJcbiAgICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0ltZykge1xyXG4gICAgICAgICAgICBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhdGgpIHJldHVybiBwYXRoO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIHNldFBlcmNlbnRzID0gZnVuY3Rpb24gKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICAgICAgdmFyIHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG4gICAgICAgICQoJy5sb2FkaW5nLXZhbHVlJykudGV4dChwZXJjZW50cyArICclJyk7XHJcbiAgICAgICAgJCgnLmJpZy5jaXJjbGUnKS5jc3MoeydzdHJva2UtZGFzaGFycmF5JzogcGVyY2VudHMgKiAxLjU3ICsgJyAnICsgJzE1Nyd9KTtcclxuXHJcbiAgICAgICAgaWYgKHBlcmNlbnRzID49IDEwMCkge1xyXG4gICAgICAgICAgICBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgbG9hZEltYWdlcyA9IGZ1bmN0aW9uIChpbWFnZXMpIHtcclxuXHJcbiAgICAgICAgaWYgKCFpbWFnZXMubGVuZ3RoKSBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG5cclxuICAgICAgICBpbWFnZXMuZm9yRWFjaChmdW5jdGlvbiAoaW1nLCBpLCBpbWFnZXMpIHtcclxuICAgICAgICAgICAgdmFyIGZha2VJbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogaW1nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZmFrZUltYWdlLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpO1xyXG4gICAgICAgICAgICBsb2FkSW1hZ2VzKGltZ3MpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGltZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxuXHJcblxyXG52YXIgcGFyYWxsYXhNb3VzZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcGFyYWxsYXhDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFyYWxsYXgnKTtcclxuICAgIGlmIChwYXJhbGxheENvbnRhaW5lciAhPT0gbnVsbCkge1xyXG4gICAgICAgIHZhciBsYXllciA9IHBhcmFsbGF4Q29udGFpbmVyLmxhc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBwYWdlWCA9IGUucGFnZVgsXHJcbiAgICAgICAgICAgICAgICBwYWdlWSA9IGUucGFnZVksXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIHBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiAwLjAxLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiAwLjAxLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXJTdHlsZSA9IGxheWVyLnN0eWxlLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3NpdGlvblggKyAncHgsJyArIHBvc2l0aW9uWSArICdweCwgMCknO1xyXG4gICAgICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG52YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tcHJvZmlsZV9fYmcnKTtcclxuICAgIHZhciBzdGFycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlLWNvbnRhaW5lcl9fYmdpY29ucycpO1xyXG4gICAgdmFyIGluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZS1jb250YWluZXJfX2luZm8nKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuICAgICAgICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJSc7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1TdHJpbmcyID0gJ3RyYW5zbGF0ZTNkKDAsJyArIHN0cmFmZSArICcsIDApJztcclxuXHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IGJsb2NrLnN0eWxlO1xyXG5cclxuICAgICAgICAgICAgc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nMjtcclxuICAgICAgICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nMjtcclxuICAgICAgICAgICAgc3R5bGUubXNUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmcyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZShzdGFycywgd1Njcm9sbCwgMjApO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUoaW5mbywgd1Njcm9sbCwgMyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG5cclxuXHJcbnZhciBtZW51QmxvZyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYmxvZy1uYXYnKTtcclxuICAgIGlmIChjb250YWluZXIgIT09IG51bGwpIHtcclxuICAgICAgICB2YXIgYmxvZ21lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi1ibG9nX19tZW51Jyk7XHJcbiAgICAgICAgdmFyIG1lbnVTdGF0ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghbWVudVN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBibG9nbWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1lbnVTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBibG9nbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1lbnVTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG52YXIgYm94RmxpcCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbl9hdXRob3JpemF0aW9uJyk7XHJcbiAgICBpZiAoYnV0dG9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgdmFyIHNpZ25ib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcHBlcicpLFxyXG4gICAgICAgICAgICBvdXRib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcC1vdXQnKSxcclxuICAgICAgICAgICAgb3V0Ym94MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b25zLXBhbmVsX19pdGVtJyk7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHNpZ25ib3guY2xhc3NMaXN0LmFkZCgnZmxpcHBlZCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG91dGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBzaWduYm94LmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXBwZWQnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBvdXRib3gyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBidXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIHNpZ25ib3guY2xhc3NMaXN0LnJlbW92ZSgnZmxpcHBlZCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciBibHVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0td29ya3NfX2JnJyksXHJcbiAgICAgICAgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXdvcmtzX19iZ2lubicpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGltZ1dpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tc3BlYWttZV9fYmFja2dyb3VuZCcpLm9mZnNldFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgcG9zTGVmdCA9IC13cmFwcGVyLm9mZnNldExlZnQsXHJcbiAgICAgICAgICAgICAgICBwb3NUb3AgPSAtd3JhcHBlci5vZmZzZXRUb3AsXHJcbiAgICAgICAgICAgICAgICBibHVyQ1NTID0gZm9ybS5zdHlsZTtcclxuXHJcbiAgICAgICAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFNpemUgPSBpbWdXaWR0aCArICdweCcgKyAnICcgKyAnYXV0byc7XHJcbiAgICAgICAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFBvc2l0aW9uID0gcG9zTGVmdCArICdweCcgKyAnICcgKyBwb3NUb3AgKyAncHgnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0oKSk7XHJcblxyXG5cclxudmFyIG5hdm1haW5tZW51ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbWVudScpLFxyXG4gICAgICAgIGdhbWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS1oYW1idXJnZXInKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChnYW1iICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBnYW1iLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudS1oYW1idXJnZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdtYWluLW1lbnVfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcblxyXG5jb25zdCBzY3JvbGxEb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjcm9sbC1kb3duJyk7XHJcbmNvbnN0IHNjcm9sbFVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjcm9sbC11cCcpO1xyXG5pZiAoc2Nyb2xsRG93bikge1xyXG4gICAgICAgICQoc2Nyb2xsRG93bikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGlkICA9ICQodGhpcykuYXR0cignaHJlZicpLFxyXG4gICAgICAgICAgICAgICAgdG9wID0gJChpZCkub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHRvcH0sIDEwMDApO1xyXG4gICAgICAgIH0pO1xyXG59XHJcbmlmIChzY3JvbGxVcCkge1xyXG4gICAgJChzY3JvbGxVcCkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciBpZCAgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKSxcclxuICAgICAgICAgICAgdG9wID0gJChpZCkub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogdG9wfSwgMTAwMCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8tLS0gc3RhcnRcclxuXHJcbmNvbnN0IGZvcm1VcGxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkJyk7XHJcblxyXG5mdW5jdGlvbiBmaWxlVXBsb2FkKHVybCwgZGF0YSwgY2IpIHtcclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcclxuXHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICBjYihyZXN1bHQuc3RhdHVzKTtcclxuICAgIH07XHJcblxyXG4gICAgeGhyLnNlbmQoZGF0YSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByZXBhcmVTZW5kRmlsZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZCAuc3RhdHVzJyk7XHJcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGxldCBmaWxlID0gZG9jdW1lbnRcclxuICAgICAgICAucXVlcnlTZWxlY3RvcignI2ZpbGUtc2VsZWN0JylcclxuICAgICAgICAuZmlsZXNbMF07XHJcbiAgICBsZXQgbmFtZSA9IGRvY3VtZW50XHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLW5hbWUnKVxyXG4gICAgICAgIC52YWx1ZTtcclxuICAgIGxldCBkZXNjID0gZG9jdW1lbnRcclxuICAgICAgICAucXVlcnlTZWxlY3RvcignI2ZpbGUtZGVzYycpXHJcbiAgICAgICAgLnZhbHVlO1xyXG4gICAgbGV0IHBsaW5rcyA9IGRvY3VtZW50XHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXBsaW5rcycpXHJcbiAgICAgICAgLnZhbHVlO1xyXG5cclxuXHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3Bob3RvJywgZmlsZSwgZmlsZS5uYW1lKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIG5hbWUpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdkZXNjJywgZGVzYyk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3BsaW5rcycsIHBsaW5rcyk7XHJcbiAgICAvLyAgZm9ybURhdGEuYXBwZW5kKCduYW1lJywgbmFtZSwgZGVzYywgcGxpbmtzKTtcclxuXHJcbiAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1VwbG9hZGluZy4uLic7XHJcbiAgICBmaWxlVXBsb2FkKCcvYWRtaW4nLCBmb3JtRGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEgPT0gJ9Cg0LDQsdC+0YLQsCDRg9GB0L/QtdGI0L3QviDQt9Cw0LPRgNGD0LbQtdC90LAnKXtcclxuICAgICAgICAgICAgZm9ybVVwbG9hZC5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5pZiAoZm9ybVVwbG9hZCkge1xyXG4gICAgZm9ybVVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZEZpbGUpO1xyXG59XHJcblxyXG4vLyBhZGRibG9ncG9zdFxyXG5jb25zdCBmb3JtQmxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibG9nJyk7XHJcblxyXG5pZiAoZm9ybUJsb2cpIHtcclxuICAgIGZvcm1CbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kUG9zdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByZXBhcmVTZW5kUG9zdChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cgLnN0YXR1cycpO1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgdGl0bGU6IGZvcm1CbG9nLnRpdGxlLnZhbHVlLFxyXG4gICAgICAgIGRhdGU6IGZvcm1CbG9nLmRhdGUudmFsdWUsXHJcbiAgICAgICAgdGV4dDogZm9ybUJsb2cudGV4dC52YWx1ZVxyXG4gICAgfTtcclxuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XHJcbiAgICBzZW5kQWpheEpzb24oJy9hZGRwb3N0JywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLy0tLS0gYmxvY2sgQmxvZ1xyXG5cclxuLy9jb25zdCBmb3JtTG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW4nKTtcclxuY29uc3QgZm9ybUxvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ0luRm9ybScpO1xyXG5cclxuaWYgKGZvcm1Mb2dpbikge1xyXG4gICAgZm9ybUxvZ2luLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVBdXRoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZUF1dGgoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dJbkZvcm0gLnN0YXR1cycpO1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgbG9naW46IGZvcm1Mb2dpbi5sb2dpbi52YWx1ZSxcclxuICAgICAgICBwYXNzd29yZDogZm9ybUxvZ2luLnBhc3N3b3JkLnZhbHVlXHJcbiAgICB9O1xyXG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcclxuICAgIHNlbmRBamF4SnNvbignL2xvZ2luJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcclxuICAgICAgICBpZihkYXRhID09IFwi0JDQstGC0L7RgNC40LfQsNGG0LjRjyDRg9GB0L/QtdGI0L3QsCFcIil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZG9uZVwiKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICcvYWRtaW4nO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuLy8tLS1lbmRcclxuXHJcblxyXG4vLyAtLS1zYXZlXHJcbmNvbnN0IGZvcm1BYm91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhYm91dCcpO1xyXG5cclxuaWYgKGZvcm1BYm91dCkge1xyXG4gICAgZm9ybUFib3V0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTYXZlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZVNhdmUoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhYm91dCAuc3RhdHVzJyk7XHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICBIVE1MNTogZm9ybUFib3V0LkhUTUw1LnZhbHVlLFxyXG4gICAgICAgIENTUzM6IGZvcm1BYm91dC5DU1MzLnZhbHVlLFxyXG4gICAgICAgIEphdmFTY3JpcHQ6IGZvcm1BYm91dC5KYXZhU2NyaXB0LnZhbHVlLFxyXG4gICAgfTtcclxuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XHJcbiAgICBzZW5kQWpheEpzb24oJy9zYXZlJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyAtLS1zYXZlIGVuZFxyXG5cclxuXHJcbi8vYWRtaW5cclxuXHJcblxyXG4vL2FkbWluIGVuZFxyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tIGJsb2NrIG1haWxcclxuY29uc3QgZm9ybU1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbCcpO1xyXG5cclxuaWYgKGZvcm1NYWlsKSB7XHJcbiAgICBmb3JtTWFpbC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZE1haWwpO1xyXG4gICAgZm9ybU1haWwuYWRkRXZlbnRMaXN0ZW5lcigncmVzZXQnLCBjbGVhclNlbmRNYWlsKTtcclxuXHJcbn1cclxuZnVuY3Rpb24gY2xlYXJTZW5kTWFpbCgpIHtcclxuICAgIGZvcm1NYWlsLnJlc2V0KCk7XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZVNlbmRNYWlsKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICBuYW1lOiBmb3JtTWFpbC5uYW1lLnZhbHVlLFxyXG4gICAgICAgIGVtYWlsOiBmb3JtTWFpbC5lbWFpbC52YWx1ZSxcclxuICAgICAgICB0ZXh0OiBmb3JtTWFpbC5tZXNzYWdlLnZhbHVlXHJcbiAgICB9O1xyXG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcclxuICAgIHNlbmRBamF4SnNvbignL3dvcmtzJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcclxuICAgICAgICBpZiAoZGF0YSA9PSAn0J/QuNGB0YzQvNC+INGD0YHQv9C10YjQvdC+INC+0YLQv9GA0LDQstC70LXQvdC+Jyl7XHJcbiAgICAgICAgICAgIGNsZWFyU2VuZE1haWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBjbGVhclBvc3RGb3JtKCkge1xyXG4gICAgdmFyIGZvcm1CbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cnKTtcclxuICAgIGlmIChmb3JtQmxvZykge1xyXG4gICAgICAgIGZvcm1CbG9nLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kQWpheEpzb24odXJsLCBkYXRhLCBjYikge1xyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICBjYihyZXN1bHQuc3RhdHVzKTtcclxuICAgICAgICAvL2NsZWFyUG9zdEZvcm0oKTtcclxuICAgIH07XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbn1cclxuXHJcblxyXG5uYXZtYWlubWVudS5zZXQoKTtcclxucGFyYWxsYXhNb3VzZSgpO1xyXG5ib3hGbGlwKCk7XHJcbm1lbnVCbG9nKCk7XHJcbi8vYmx1ci5zZXQoKTtcclxuXHJcbndpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGJsdXIuc2V0KCk7XHJcbn1cclxud2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICBwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG59XHJcbnByZWxvYWRlci5pbml0KCk7XHJcblxyXG52YXIgc2xpZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBjb3VudGVyID0gMCxcclxuICAgICAgICBkdXJhdGlvbiA9IDMwMCxcclxuICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgbW92ZVNsaWRlRGVzYyA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRpcmVjdGlvbikge1xyXG4gICAgICAgIHZhciBpdGVtcyA9ICQoJy5zbGlkZXItaW5mb19fYm94JywgY29udGFpbmVyKSxcclxuICAgICAgICAgICAgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT0gJ2Rpc3BsYXknID8gXCJub25lXCIgOiBcImJsb2NrXCI7XHJcbiAgICAgICAgaWYgKGNvdW50ZXIgPj0gaXRlbXMubGVuZ3RoKSBjb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShjb3VudGVyKTtcclxuXHJcbiAgICAgICAgYWN0aXZlSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ29wYWNpdHknOiBkaXJlY3Rpb25cclxuICAgICAgICB9LCBkdXJhdGlvbik7XHJcblxyXG4gICAgICAgIHJlcUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICdvcGFjaXR5JzogZGlyZWN0aW9uXHJcbiAgICAgICAgfSwgZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgYWN0aXZlSXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJykuY3NzKCdvcGFjaXR5JywgZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG1vdmVTbGlkZU1haW4gPSBmdW5jdGlvbiAoY29udGFpbmVyLCBkaXJlY3Rpb24pIHtcclxuICAgICAgICB2YXIgaXRlbXMgPSAkKCcuc2xpZGVyLWltZ3NfX2xpc3QtaXRlbScsIGNvbnRhaW5lciksXHJcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5hY3RpdmUnKSxcclxuICAgICAgICAgICAgZGlyZWN0aW9uID0gZGlyZWN0aW9uID09ICdvcGFjaXR5JyA/IDAgOiAxO1xyXG4gICAgICAgIGlmIChjb3VudGVyID49IGl0ZW1zLmxlbmd0aCkgY291bnRlciA9IDA7XHJcblxyXG4gICAgICAgIHZhciByZXFJdGVtID0gaXRlbXMuZXEoY291bnRlcik7XHJcblxyXG4gICAgICAgIGFjdGl2ZUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICdvcGFjaXR5JzogZGlyZWN0aW9uXHJcbiAgICAgICAgfSwgZHVyYXRpb24pO1xyXG5cclxuICAgICAgICByZXFJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAnb3BhY2l0eSc6ICcxJ1xyXG4gICAgICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmNzcygnb3BhY2l0eScsIGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB2YXIgbW92ZVNsaWRlRG93biA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRpcmVjdGlvbikge1xyXG4gICAgICAgIHZhciBpdGVtcyA9ICQoJy5zbGlkZXItaW1nc19fbGlzdC1pdGVtJywgY29udGFpbmVyKSxcclxuICAgICAgICAgICAgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT0gJ2Rvd24nID8gMTAwIDogLTEwMDtcclxuXHJcbiAgICAgICAgaWYgKGNvdW50ZXIgPD0gLWl0ZW1zLmxlbmd0aCkgY291bnRlciA9IDA7XHJcbiAgICAgICAgdmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShjb3VudGVyIC0gMSk7XHJcblxyXG4gICAgICAgIGFjdGl2ZUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICd0b3AnOiBkaXJlY3Rpb24gKyAnJSdcclxuICAgICAgICB9LCBkdXJhdGlvbik7XHJcblxyXG4gICAgICAgIHJlcUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICd0b3AnOiAnMCdcclxuICAgICAgICB9LCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5jc3MoJ3RvcCcsIC1kaXJlY3Rpb24gKyAnJScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgaW5Qcm9jZXNzID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgdmFyIG1vdmVTbGlkZVVwID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gJCgnLnNsaWRlci1pbWdzX19saXN0LWl0ZW0nLCBjb250YWluZXIpLFxyXG4gICAgICAgICAgICBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcuYWN0aXZlJyksXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PSAnZG93bicgPyAxMDAgOiAtMTAwO1xyXG5cclxuICAgICAgICBpZiAoY291bnRlciA+PSBpdGVtcy5sZW5ndGggLSAxKSBjb3VudGVyID0gLTE7XHJcbiAgICAgICAgdmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShjb3VudGVyICsgMSk7XHJcblxyXG4gICAgICAgIGFjdGl2ZUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICd0b3AnOiBkaXJlY3Rpb24gKyAnJSdcclxuICAgICAgICB9LCBkdXJhdGlvbik7XHJcblxyXG4gICAgICAgIHJlcUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICd0b3AnOiAnMCdcclxuICAgICAgICB9LCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5jc3MoJ3RvcCcsIC1kaXJlY3Rpb24gKyAnJScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgaW5Qcm9jZXNzID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5zbGlkZXItaW1nc19fdXAnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuLy9jb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWluUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGluUHJvY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZURlc2MoJCgnLnNsaWRlci1pbmZvJyksICdibG9jaycpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZU1haW4oJCgnLnNsaWRlci1pbWdzX19ib3gnKSwgJ29wYWNpdHknKTtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlU2xpZGVEb3duKCQoJy5zbGlkZXItaW1nc19fZG93bicpLCAnZG93bicpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZVVwKCQoJy5zbGlkZXItaW1nc19fdXAnKSwgJ3VwJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2NvdW50ZXIrKztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoJy5zbGlkZXItaW1nc19fZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jb3VudGVyLS07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWluUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGluUHJvY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlci0tO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZURlc2MoJCgnLnNsaWRlci1pbmZvJyksICdibG9jaycpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZU1haW4oJCgnLnNsaWRlci1pbWdzX19ib3gnKSwgJ29wYWNpdHknKTtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlU2xpZGVVcCgkKCcuc2xpZGVyLWltZ3NfX3VwJyksICd1cCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZURvd24oJCgnLnNsaWRlci1pbWdzX19kb3duJyksICdkb3duJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxuc2xpZGVyLmluaXQoKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=
