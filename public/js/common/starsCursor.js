class StarsCursor {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.w = 0;
        this.h = 0;
        this.starsList = [];
        this.starColors = [[246, 241, 82], [255, 215, 0], [255, 165, 0], [255, 255, 0], [255, 192, 203]];
        this.timer = null;
        this.init();
    }

    init() {
        // 初始化
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        eventBinder(window, 'resize', this.reset.bind(this));
        eventBinder(window, 'click', this._mouseClick.bind(this));
        this.reset();
        this.render();
    }

    reset() {
        // 重置
        this.w = this.canvas.width = window.innerWidth;
        this.h = this.canvas.height = window.innerHeight;
    }

    _mouseClick(e) {
        // 鼠标点击事件
        let x = e.clientX;
        let y = e.clientY;
        this.drawStars(x, y);

    }

    drawStars(x, y) {
        for (let i = 0; i <= 30; i++) {
            let stepX = Math.random() * 2 - 1;
            let stepY = -Math.random() * 2 - 6;
            const {ctx, starColors} = this;
            this.starsList.push(new Star({
                x,
                y,
                stepX,
                stepY,
                stepAngle: Math.random() * 0.01 - 0.02,
                scale: Math.random() * 0.5 + 0.5,
                color: starColors[Math.floor(Math.random() * starColors.length)]
            }).render(ctx))
        }
    }

    render() {
        // 主逻辑
        this.timer =  setInterval(() => {
            const  {w, h} = this;
            this.ctx.clearRect(0, 0, w, h);
            this.starsList.forEach((item, index) => {
                item.draw();
                if (item.active === false) {
                    this.starsList.splice(index, 1);
                }
            })
        }, 9)
    }
}

class Star {
    constructor(options) {
        this.x = 0;
        this.y = 0;
        this.stepX = 0;
        this.stepY = 0;
        this.r = 6;
        this.R = 12;
        this.color = null;
        this.scale = 1;
        this.opacity = 1;
        this.angle = 0;
        this.stepAngle = 0;
        this.active = true;
        return Object.assign(this, options);
    }

    render(ctx) {
        this.ctx = ctx;
        this.draw();
        return this;
    }

    draw() {
        const {ctx, x, y, r, R, color, scale, opacity, angle} = this;
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.rotate(angle);
        ctx.beginPath();
        for (let i = 0; i <= 5; i++) {
            ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * R + R, -Math.sin((18 + i * 72) / 180 * Math.PI) * R + R);
            ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * r + R, -Math.sin((54 + i * 72) / 180 * Math.PI) * r + R);
        };
        ctx.closePath();
        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
        ctx.fill();
        ctx.restore();
        this.x += this.stepX;
        this.y += this.stepY;
        this.stepY += 0.3;
        this.opacity -= 0.015;
        this.angle += this.stepAngle;
        if (this.opacity <= 0) {
            this.active = false;
        }
    }
}

eventBinder(window, 'load', new StarsCursor());