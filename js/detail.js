window.addEventListener('load', function () {
    var mask = document.querySelector('.mask');
    var preview_img = document.querySelector('.preview_img');
    var picimg = document.querySelector('.pic_i');
    var bigpic = document.querySelector('.bigpic');
        preview_img.addEventListener('mouseenter', function (e) {
        mask.style.display = 'block';
        bigpic.style.display = 'block' ;
        preview_img.addEventListener('mousemove', function (e) {
            var x = e.pageX - preview_img.offsetLeft;
            var y = e.pageY - preview_img.offsetTop;
            var maskX = x - mask.offsetWidth / 2;
            var maskY = y - mask.offsetHeight / 2;
            var maskMax = preview_img.offsetWidth - mask.offsetWidth;
            console.log(maskMax);
            if (maskX <= 0) {
                maskX = 0;
            } else if (maskX >= preview_img.offsetWidth - mask.offsetWidth) {
                maskX = preview_img.offsetWidth - mask.offsetWidth;
            }
            if (maskY <= 0) {
                maskY = 0;
            } else if (maskY >= preview_img.offsetHeight - mask.offsetHeight) {
                maskY = preview_img.offsetHeight - mask.offsetHeight;
            }
            mask.style.left = maskX + 'px';
            mask.style.top = maskY + 'px';
            picimg.style.left = - (picimg.offsetWidth - bigpic.offsetWidth) / maskMax * maskX + 'px';
            picimg.style.top = - (picimg.offsetHeight - bigpic.offsetHeight) / maskMax * maskY + 'px';
        })
    });
    preview_img.addEventListener('mouseleave' ,function() {
        mask.style.display = 'none';
        bigpic.style.display = 'none' ;
    })
})