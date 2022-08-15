// 封装事件绑定函数
function eventBinder(element, event, callback) {
    if (element.addEventListener) {
        element.addEventListener(event, callback);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, callback);
    } else {
        element['on' + event] = callback;
    }
}

// 时间格式化，返回时间格式：xxxx-xx-xx xx:xx:xx 星期四
function timeFormatter() {
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const now = new Date();
    const year = now.getFullYear();
    const month = addZero(now.getMonth() + 1);
    const date = addZero(now.getDate());
    const hours = addZero(now.getHours());
    const minutes = addZero(now.getMinutes());
    const seconds = addZero(now.getSeconds());
    const day = now.getDay();
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + days[day];
}

// 数字补零
function addZero(num) {
    return num < 10 ? '0' + num : num;
}

// canvas流星封装
function drawMeteor(ctx, snowFlake, gradient) {
    const {x, y, r, color} = snowFlake;
    const pi = Math.PI;
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(x, y, r, 0, 2*pi);
    ctx.fill();
    ctx.closePath();
}