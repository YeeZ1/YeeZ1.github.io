window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var lis = ul.children;
    var ol = focus.querySelector('ol');
    var arrr = focus.querySelector('.arr-r');
    var arrl = focus.querySelector('.arr-l');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        arrr.style.display = 'block';
        arrl.style.display = 'block';
        clearInterval(timer) ;
        timer = null ;
    });
    focus.addEventListener('mouseleave', function () {
        arrr.style.display = 'none';
        arrl.style.display = 'none';
        timer = setInterval(function() {
            arrr.click() ;
        },2000)
    })
    for (var i = 0; i < lis.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'active';
            var index = this.getAttribute('index');
            num = circle = index ;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'active';
    var lili = ul.children[0].cloneNode(true);
    ul.appendChild(lili);
    var num = 0;
    var circle = 0;
    var flag = true ;
    arrr.addEventListener('click', function () {
        if(flag) {
            flag = false ;
            if (num === ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth , function() {
                flag = true ;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange() ;
        }
    }) ;
    arrl.addEventListener('click', function () {
       if(flag) {
           flag = false;
        if (num === 0) {
            ul.style.left = -focusWidth*(ul.children.length - 1) + 'px';
            num = ul.children.length - 1;
        }
        num--;
        animate(ul, -num * focusWidth , function() {
            flag = true ;
        });
        circle--;
        if (circle < 0 ) {
            circle = ol.children.length - 1;
        }
        circleChange() ;
       }
    }) ;
    var timer = setInterval(function() {
        arrr.click() ;
    } , 2000)
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'active';
    }
    function animate(ele, target, callback) {
        clearInterval(ele.timer);
        ele.timer = setInterval(function () {
            var step = (target - ele.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (ele.offsetLeft == target) {
                clearInterval(ele.timer);
                callback && callback();
            } else {
                ele.style.left = ele.offsetLeft + step + 'px';
            }
        }, 15)
    }
}) ;
$(function() {
    var rTop = $(".recommend").offset().top ;
    show() ;
    function show() {
        if($(document).scrollTop() >= rTop) {
            $(".show1").show();
        }else {
            $(".show1").hide() ;
        }
    }
    var flag = true ;
    //添加节流阀，避免点击电梯导航按钮时，页面滚动，导致经过的li更给样式
    $(".show1 li").click(function() {
        flag = false ; 
        $(this).children("a").addClass("current").parent().siblings().find("a").removeClass("current") ;
        var index = $(this).index() ;
        var current = $(".floor>.w").eq(index) ;
        // console.log(current.offset().top);
        $("html").stop().animate( {
            scrollTop:Math.ceil(current.offset().top )
        } , function() {
            //页面滚动动画完毕，在回调函数设置一个延迟计时器，打开节流阀，
            setTimeout(function() {
                flag = true ;
            },200)
        })
        // $(document).scrollTop(current.offset().top);
    });
    $(window).scroll(function() {
        show() ;
       if(flag) {
        $(".floor>.w").each(function(i , ele) {
            if( $(document).scrollTop() >= $(ele).offset().top) {
                // console.log(i);
            var actLi = $(".show1 li").eq(i) ;
            actLi.children().addClass('current').parent().siblings().find("a").removeClass("current") ;
            }
        })
       }
    })
})