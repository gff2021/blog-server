eventBinder(window, 'load', () => {
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const linearGradient = ctx.createLinearGradient(0, 0, innerWidth, innerHeight); // 线性渐变对象
    const linearGradientArr = [
        ['0', 'rgba(255, 255, 255, 1)'],
        ['0.5', 'rgba(255, 255, 255, 0.5)'],
        ['1.0', 'rgba(255, 255, 255, 0)'],
    ]; // 线性渐变集合
    linearGradient.addColorStop(linearGradientArr[0][0], linearGradientArr[0][1]);
    linearGradient.addColorStop(linearGradientArr[1][0], linearGradientArr[1][1]);
    linearGradient.addColorStop(linearGradientArr[2][0], linearGradientArr[2][1]);
    

    // 流星类
    class Meteor{
        constructor() {
            this.x = Math.floor(Math.random() * innerWidth);
            this.y = Math.floor(Math.random() * 160);
            this.r = Math.floor(Math.random() * 5); // 流星半径
            this.tailLength = Math.floor(Math.random() * 10 + 40); // 尾巴长度
            this.color = '#fff'
        }
    }

    const meteors = []; // 流星集合
    const meteorsEverySecond = 2; // 每秒产生流星数量

    // 初次加载设置画布尺寸
    canvas.setAttribute('width', innerWidth);
    canvas.setAttribute('height', innerHeight);

    // 窗口调整大小
    let windowResizeTimer;
    eventBinder(window, 'resize', () => {
        if (windowResizeTimer) {
            clearTimeout(windowResizeTimer);
        };
        windowResizeTimer = setTimeout(() => {
            innerWidth = window.innerWidth;
            innerHeight = window.innerHeight;
            canvas.setAttribute('width', innerWidth);
            canvas.setAttribute('height', innerHeight);
        }, 100);
    });

    const addMeteorTimer = setInterval(() => {
        for (let i = 0; i <= meteorsEverySecond; i++) {
            const meteor = new Meteor();
            meteors.push(meteor);
        }
    }, 1000);

    const meteorSlideTimer = setInterval(() => {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        let [stepX, stepY] = [4, 1];
        meteors.forEach((item, index) => {
            item.x += stepX;
            item.y += stepY;
            if (item.x >= innerWidth || item.y >= innerHeight) {
                meteors.splice(index, 1)
            } else {
                drawMeteor(ctx, item, linearGradient);
            }
        })
    }, 10)
})