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

    var tops = $('.about-skills').offset().top;
    var tops2 = document.querySelector('#about').offsetParent.scrollTop;
    //console.log(tops + "-" +  wScroll + "," + tops2);
    if (tops2 >= tops){
        circles();
    }



}
function circles(){

    var tst = document.querySelectorAll('.skills-info__circle');
    var tst2 = document.querySelectorAll('.skills-info__name');

    for (var i = 0; i <= tst.length; i++){
            $(tst[i]).delay(2000).removeClass("not-active");
    }
    for (var i = 0; i <= tst2.length; i++){
        $(tst2[i]).delay(2000).removeClass("not-active");
    }
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






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG52YXIgcHJlbG9hZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMDtcclxuICAgIHZhciBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XHJcbiAgICB2YXIgaW1nUGF0aCA9ICQoJyonKS5tYXAoZnVuY3Rpb24gKG5keCwgZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBiYWNrZ3JvdW5kID0gJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKTtcclxuICAgICAgICB2YXIgaXNJbWcgPSAkKGVsZW1lbnQpLmlzKCdpbWcnKTtcclxuICAgICAgICB2YXIgcGF0aCA9ICcnO1xyXG4gICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xyXG4gICAgICAgICAgICBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNJbWcpIHtcclxuICAgICAgICAgICAgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXRoKSByZXR1cm4gcGF0aDtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBzZXRQZXJjZW50cyA9IGZ1bmN0aW9uICh0b3RhbCwgY3VycmVudCkge1xyXG4gICAgICAgIHZhciBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG5cclxuICAgICAgICAkKCcubG9hZGluZy12YWx1ZScpLnRleHQocGVyY2VudHMgKyAnJScpO1xyXG4gICAgICAgICQoJy5iaWcuY2lyY2xlJykuY3NzKHsnc3Ryb2tlLWRhc2hhcnJheSc6IHBlcmNlbnRzICogMS41NyArICcgJyArICcxNTcnfSk7XHJcblxyXG4gICAgICAgIGlmIChwZXJjZW50cyA+PSAxMDApIHtcclxuICAgICAgICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxvYWRJbWFnZXMgPSBmdW5jdGlvbiAoaW1hZ2VzKSB7XHJcblxyXG4gICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKGltZywgaSwgaW1hZ2VzKSB7XHJcbiAgICAgICAgICAgIHZhciBmYWtlSW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgICAgICAgICBzcmM6IGltZ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGltZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcclxuICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpbWdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcblxyXG5cclxudmFyIHBhcmFsbGF4TW91c2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmFsbGF4Jyk7XHJcbiAgICBpZiAocGFyYWxsYXhDb250YWluZXIgIT09IG51bGwpIHtcclxuICAgICAgICB2YXIgbGF5ZXIgPSBwYXJhbGxheENvbnRhaW5lci5sYXN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgcGFnZVggPSBlLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWCA9IGluaXRpYWxYICogMC4wMSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWSA9IGluaXRpYWxZICogMC4wMSxcclxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgnICsgcG9zaXRpb25YICsgJ3B4LCcgKyBwb3NpdGlvblkgKyAncHgsIDApJztcclxuICAgICAgICAgICAgbGF5ZXJTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxudmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLXByb2ZpbGVfX2JnJyk7XHJcbiAgICB2YXIgc3RhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZS1jb250YWluZXJfX2JnaWNvbnMnKTtcclxuICAgIHZhciBpbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGUtY29udGFpbmVyX19pbmZvJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICAgICAgICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xyXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nMiA9ICd0cmFuc2xhdGUzZCgwLCcgKyBzdHJhZmUgKyAnLCAwKSc7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuXHJcbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZzI7XHJcbiAgICAgICAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZzI7XHJcbiAgICAgICAgICAgIHN0eWxlLm1zVHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nMjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUoc3RhcnMsIHdTY3JvbGwsIDIwKTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKGluZm8sIHdTY3JvbGwsIDMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxuXHJcblxyXG52YXIgbWVudUJsb2cgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJsb2ctbmF2Jyk7XHJcbiAgICBpZiAoY29udGFpbmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgdmFyIGJsb2dtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tYmxvZ19fbWVudScpO1xyXG4gICAgICAgIHZhciBtZW51U3RhdGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIW1lbnVTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgYmxvZ21lbnUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtZW51U3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmxvZ21lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtZW51U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxudmFyIGJveEZsaXAgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b25fYXV0aG9yaXphdGlvbicpO1xyXG4gICAgaWYgKGJ1dHRvbiAhPT0gbnVsbCkge1xyXG4gICAgICAgIHZhciBzaWduYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXBwZXInKSxcclxuICAgICAgICAgICAgb3V0Ym94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXAtb3V0JyksXHJcbiAgICAgICAgICAgIG91dGJveDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9ucy1wYW5lbF9faXRlbScpO1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBzaWduYm94LmNsYXNzTGlzdC5hZGQoJ2ZsaXBwZWQnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBvdXRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgc2lnbmJveC5jbGFzc0xpc3QucmVtb3ZlKCdmbGlwcGVkJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgb3V0Ym94Mi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBzaWduYm94LmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXBwZWQnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG52YXIgYmx1ciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXdvcmtzX19iZycpLFxyXG4gICAgICAgIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS13b3Jrc19fYmdpbm4nKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbWdXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLXNwZWFrbWVfX2JhY2tncm91bmQnKS5vZmZzZXRXaWR0aCxcclxuICAgICAgICAgICAgICAgIHBvc0xlZnQgPSAtd3JhcHBlci5vZmZzZXRMZWZ0LFxyXG4gICAgICAgICAgICAgICAgcG9zVG9wID0gLXdyYXBwZXIub2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICAgICAgYmx1ckNTUyA9IGZvcm0uc3R5bGU7XHJcblxyXG4gICAgICAgICAgICBibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgJ2F1dG8nO1xyXG4gICAgICAgICAgICBibHVyQ1NTLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KCkpO1xyXG5cclxuXHJcbnZhciBuYXZtYWlubWVudSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW1lbnUnKSxcclxuICAgICAgICBnYW1iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtaGFtYnVyZ2VyJyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoZ2FtYiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZ2FtYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ21lbnUtaGFtYnVyZ2VyX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnbWFpbi1tZW51X2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG5cclxuY29uc3Qgc2Nyb2xsRG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtZG93bicpO1xyXG5jb25zdCBzY3JvbGxVcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtdXAnKTtcclxuaWYgKHNjcm9sbERvd24pIHtcclxuICAgICAgICAkKHNjcm9sbERvd24pLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBpZCAgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKSxcclxuICAgICAgICAgICAgICAgIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCAxMDAwKTtcclxuICAgICAgICB9KTtcclxufVxyXG5pZiAoc2Nyb2xsVXApIHtcclxuICAgICQoc2Nyb2xsVXApLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgaWQgID0gJCh0aGlzKS5hdHRyKCdocmVmJyksXHJcbiAgICAgICAgICAgIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHRvcH0sIDEwMDApO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vLS0tIHN0YXJ0XHJcblxyXG5jb25zdCBmb3JtVXBsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZCcpO1xyXG5cclxuZnVuY3Rpb24gZmlsZVVwbG9hZCh1cmwsIGRhdGEsIGNiKSB7XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XHJcblxyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgY2IocmVzdWx0LnN0YXR1cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHhoci5zZW5kKGRhdGEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVwYXJlU2VuZEZpbGUoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWQgLnN0YXR1cycpO1xyXG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBsZXQgZmlsZSA9IGRvY3VtZW50XHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXNlbGVjdCcpXHJcbiAgICAgICAgLmZpbGVzWzBdO1xyXG4gICAgbGV0IG5hbWUgPSBkb2N1bWVudFxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1uYW1lJylcclxuICAgICAgICAudmFsdWU7XHJcbiAgICBsZXQgZGVzYyA9IGRvY3VtZW50XHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLWRlc2MnKVxyXG4gICAgICAgIC52YWx1ZTtcclxuICAgIGxldCBwbGlua3MgPSBkb2N1bWVudFxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1wbGlua3MnKVxyXG4gICAgICAgIC52YWx1ZTtcclxuXHJcblxyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdwaG90bycsIGZpbGUsIGZpbGUubmFtZSk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ25hbWUnLCBuYW1lKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnZGVzYycsIGRlc2MpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdwbGlua3MnLCBwbGlua3MpO1xyXG4gICAgLy8gIGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIG5hbWUsIGRlc2MsIHBsaW5rcyk7XHJcblxyXG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdVcGxvYWRpbmcuLi4nO1xyXG4gICAgZmlsZVVwbG9hZCgnL2FkbWluJywgZm9ybURhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XHJcblxyXG4gICAgICAgIGlmIChkYXRhID09ICfQoNCw0LHQvtGC0LAg0YPRgdC/0LXRiNC90L4g0LfQsNCz0YDRg9C20LXQvdCwJyl7XHJcbiAgICAgICAgICAgIGZvcm1VcGxvYWQucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuaWYgKGZvcm1VcGxvYWQpIHtcclxuICAgIGZvcm1VcGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRGaWxlKTtcclxufVxyXG5cclxuLy8gYWRkYmxvZ3Bvc3RcclxuY29uc3QgZm9ybUJsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxvZycpO1xyXG5cclxuaWYgKGZvcm1CbG9nKSB7XHJcbiAgICBmb3JtQmxvZy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZFBvc3QpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVwYXJlU2VuZFBvc3QoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibG9nIC5zdGF0dXMnKTtcclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgIHRpdGxlOiBmb3JtQmxvZy50aXRsZS52YWx1ZSxcclxuICAgICAgICBkYXRlOiBmb3JtQmxvZy5kYXRlLnZhbHVlLFxyXG4gICAgICAgIHRleHQ6IGZvcm1CbG9nLnRleHQudmFsdWVcclxuICAgIH07XHJcbiAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1NlbmRpbmcuLi4nO1xyXG4gICAgc2VuZEFqYXhKc29uKCcvYWRkcG9zdCcsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8tLS0tIGJsb2NrIEJsb2dcclxuXHJcbi8vY29uc3QgZm9ybUxvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luJyk7XHJcbmNvbnN0IGZvcm1Mb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dJbkZvcm0nKTtcclxuXHJcbmlmIChmb3JtTG9naW4pIHtcclxuICAgIGZvcm1Mb2dpbi5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlQXV0aCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByZXBhcmVBdXRoKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9nSW5Gb3JtIC5zdGF0dXMnKTtcclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgIGxvZ2luOiBmb3JtTG9naW4ubG9naW4udmFsdWUsXHJcbiAgICAgICAgcGFzc3dvcmQ6IGZvcm1Mb2dpbi5wYXNzd29yZC52YWx1ZVxyXG4gICAgfTtcclxuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XHJcbiAgICBzZW5kQWpheEpzb24oJy9sb2dpbicsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XHJcbiAgICAgICAgaWYoZGF0YSA9PSBcItCQ0LLRgtC+0YDQuNC30LDRhtC40Y8g0YPRgdC/0LXRiNC90LAhXCIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRvbmVcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnL2FkbWluJztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbi8vLS0tZW5kXHJcblxyXG5cclxuLy8gLS0tc2F2ZVxyXG5jb25zdCBmb3JtQWJvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWJvdXQnKTtcclxuXHJcbmlmIChmb3JtQWJvdXQpIHtcclxuICAgIGZvcm1BYm91dC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2F2ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByZXBhcmVTYXZlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWJvdXQgLnN0YXR1cycpO1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgSFRNTDU6IGZvcm1BYm91dC5IVE1MNS52YWx1ZSxcclxuICAgICAgICBDU1MzOiBmb3JtQWJvdXQuQ1NTMy52YWx1ZSxcclxuICAgICAgICBKYXZhU2NyaXB0OiBmb3JtQWJvdXQuSmF2YVNjcmlwdC52YWx1ZSxcclxuICAgIH07XHJcbiAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1NlbmRpbmcuLi4nO1xyXG4gICAgc2VuZEFqYXhKc29uKCcvc2F2ZScsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gLS0tc2F2ZSBlbmRcclxuXHJcblxyXG4vL2FkbWluXHJcblxyXG5cclxuLy9hZG1pbiBlbmRcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLSBibG9jayBtYWlsXHJcbmNvbnN0IGZvcm1NYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haWwnKTtcclxuXHJcbmlmIChmb3JtTWFpbCkge1xyXG4gICAgZm9ybU1haWwuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRNYWlsKTtcclxuICAgIGZvcm1NYWlsLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2V0JywgY2xlYXJTZW5kTWFpbCk7XHJcblxyXG59XHJcbmZ1bmN0aW9uIGNsZWFyU2VuZE1haWwoKSB7XHJcbiAgICBmb3JtTWFpbC5yZXNldCgpO1xyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIHByZXBhcmVTZW5kTWFpbChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgbmFtZTogZm9ybU1haWwubmFtZS52YWx1ZSxcclxuICAgICAgICBlbWFpbDogZm9ybU1haWwuZW1haWwudmFsdWUsXHJcbiAgICAgICAgdGV4dDogZm9ybU1haWwubWVzc2FnZS52YWx1ZVxyXG4gICAgfTtcclxuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XHJcbiAgICBzZW5kQWpheEpzb24oJy93b3JrcycsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XHJcbiAgICAgICAgaWYgKGRhdGEgPT0gJ9Cf0LjRgdGM0LzQviDRg9GB0L/QtdGI0L3QviDQvtGC0L/RgNCw0LLQu9C10L3Qvicpe1xyXG4gICAgICAgICAgICBjbGVhclNlbmRNYWlsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gY2xlYXJQb3N0Rm9ybSgpIHtcclxuICAgIHZhciBmb3JtQmxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibG9nJyk7XHJcbiAgICBpZiAoZm9ybUJsb2cpIHtcclxuICAgICAgICBmb3JtQmxvZy5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZEFqYXhKc29uKHVybCwgZGF0YSwgY2IpIHtcclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgY2IocmVzdWx0LnN0YXR1cyk7XHJcbiAgICAgICAgLy9jbGVhclBvc3RGb3JtKCk7XHJcbiAgICB9O1xyXG4gICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG59XHJcblxyXG5cclxubmF2bWFpbm1lbnUuc2V0KCk7XHJcbnBhcmFsbGF4TW91c2UoKTtcclxuYm94RmxpcCgpO1xyXG5tZW51QmxvZygpO1xyXG4vL2JsdXIuc2V0KCk7XHJcblxyXG53aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBibHVyLnNldCgpO1xyXG59XHJcbndpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgcGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuXHJcbiAgICB2YXIgdG9wcyA9ICQoJy5hYm91dC1za2lsbHMnKS5vZmZzZXQoKS50b3A7XHJcbiAgICB2YXIgdG9wczIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWJvdXQnKS5vZmZzZXRQYXJlbnQuc2Nyb2xsVG9wO1xyXG4gICAgLy9jb25zb2xlLmxvZyh0b3BzICsgXCItXCIgKyAgd1Njcm9sbCArIFwiLFwiICsgdG9wczIpO1xyXG4gICAgaWYgKHRvcHMyID49IHRvcHMpe1xyXG4gICAgICAgIGNpcmNsZXMoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5mdW5jdGlvbiBjaXJjbGVzKCl7XHJcblxyXG4gICAgdmFyIHRzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbHMtaW5mb19fY2lyY2xlJyk7XHJcbiAgICB2YXIgdHN0MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbHMtaW5mb19fbmFtZScpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHRzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICQodHN0W2ldKS5kZWxheSgyMDAwKS5yZW1vdmVDbGFzcyhcIm5vdC1hY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSB0c3QyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAkKHRzdDJbaV0pLmRlbGF5KDIwMDApLnJlbW92ZUNsYXNzKFwibm90LWFjdGl2ZVwiKTtcclxuICAgIH1cclxufVxyXG5cclxucHJlbG9hZGVyLmluaXQoKTtcclxuXHJcbnZhciBzbGlkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNvdW50ZXIgPSAwLFxyXG4gICAgICAgIGR1cmF0aW9uID0gMzAwLFxyXG4gICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgIHZhciBtb3ZlU2xpZGVEZXNjID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gJCgnLnNsaWRlci1pbmZvX19ib3gnLCBjb250YWluZXIpLFxyXG4gICAgICAgICAgICBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcuYWN0aXZlJyksXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PSAnZGlzcGxheScgPyBcIm5vbmVcIiA6IFwiYmxvY2tcIjtcclxuICAgICAgICBpZiAoY291bnRlciA+PSBpdGVtcy5sZW5ndGgpIGNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICB2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGNvdW50ZXIpO1xyXG5cclxuICAgICAgICBhY3RpdmVJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAnb3BhY2l0eSc6IGRpcmVjdGlvblxyXG4gICAgICAgIH0sIGR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgcmVxSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ29wYWNpdHknOiBkaXJlY3Rpb25cclxuICAgICAgICB9LCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5jc3MoJ29wYWNpdHknLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgaW5Qcm9jZXNzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgbW92ZVNsaWRlTWFpbiA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRpcmVjdGlvbikge1xyXG4gICAgICAgIHZhciBpdGVtcyA9ICQoJy5zbGlkZXItaW1nc19fbGlzdC1pdGVtJywgY29udGFpbmVyKSxcclxuICAgICAgICAgICAgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT0gJ29wYWNpdHknID8gMCA6IDE7XHJcbiAgICAgICAgaWYgKGNvdW50ZXIgPj0gaXRlbXMubGVuZ3RoKSBjb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShjb3VudGVyKTtcclxuXHJcbiAgICAgICAgYWN0aXZlSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ29wYWNpdHknOiBkaXJlY3Rpb25cclxuICAgICAgICB9LCBkdXJhdGlvbik7XHJcblxyXG4gICAgICAgIHJlcUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICdvcGFjaXR5JzogJzEnXHJcbiAgICAgICAgfSwgZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgYWN0aXZlSXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJykuY3NzKCdvcGFjaXR5JywgZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHZhciBtb3ZlU2xpZGVEb3duID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gJCgnLnNsaWRlci1pbWdzX19saXN0LWl0ZW0nLCBjb250YWluZXIpLFxyXG4gICAgICAgICAgICBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcuYWN0aXZlJyksXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PSAnZG93bicgPyAxMDAgOiAtMTAwO1xyXG5cclxuICAgICAgICBpZiAoY291bnRlciA8PSAtaXRlbXMubGVuZ3RoKSBjb3VudGVyID0gMDtcclxuICAgICAgICB2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGNvdW50ZXIgLSAxKTtcclxuXHJcbiAgICAgICAgYWN0aXZlSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ3RvcCc6IGRpcmVjdGlvbiArICclJ1xyXG4gICAgICAgIH0sIGR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgcmVxSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ3RvcCc6ICcwJ1xyXG4gICAgICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmNzcygndG9wJywgLWRpcmVjdGlvbiArICclJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB2YXIgbW92ZVNsaWRlVXAgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBkaXJlY3Rpb24pIHtcclxuICAgICAgICB2YXIgaXRlbXMgPSAkKCcuc2xpZGVyLWltZ3NfX2xpc3QtaXRlbScsIGNvbnRhaW5lciksXHJcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5hY3RpdmUnKSxcclxuICAgICAgICAgICAgZGlyZWN0aW9uID0gZGlyZWN0aW9uID09ICdkb3duJyA/IDEwMCA6IC0xMDA7XHJcblxyXG4gICAgICAgIGlmIChjb3VudGVyID49IGl0ZW1zLmxlbmd0aCAtIDEpIGNvdW50ZXIgPSAtMTtcclxuICAgICAgICB2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGNvdW50ZXIgKyAxKTtcclxuXHJcbiAgICAgICAgYWN0aXZlSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ3RvcCc6IGRpcmVjdGlvbiArICclJ1xyXG4gICAgICAgIH0sIGR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgcmVxSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgJ3RvcCc6ICcwJ1xyXG4gICAgICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmNzcygndG9wJywgLWRpcmVjdGlvbiArICclJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLnNsaWRlci1pbWdzX191cCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vL2NvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5Qcm9jZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlRGVzYygkKCcuc2xpZGVyLWluZm8nKSwgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlTWFpbigkKCcuc2xpZGVyLWltZ3NfX2JveCcpLCAnb3BhY2l0eScpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZURvd24oJCgnLnNsaWRlci1pbWdzX19kb3duJyksICdkb3duJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlVXAoJCgnLnNsaWRlci1pbWdzX191cCcpLCAndXAnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY291bnRlcisrO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJCgnLnNsaWRlci1pbWdzX19kb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvdW50ZXItLTtcclxuICAgICAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5Qcm9jZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyLS07XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlRGVzYygkKCcuc2xpZGVyLWluZm8nKSwgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlTWFpbigkKCcuc2xpZGVyLWltZ3NfX2JveCcpLCAnb3BhY2l0eScpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZVVwKCQoJy5zbGlkZXItaW1nc19fdXAnKSwgJ3VwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlRG93bigkKCcuc2xpZGVyLWltZ3NfX2Rvd24nKSwgJ2Rvd24nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG5zbGlkZXIuaW5pdCgpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==
