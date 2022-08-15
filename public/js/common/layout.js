class Layout {
    constructor() {
        this.header = null;
        this.clock = null;
        this.timer = null;
        this.init();
    }

    init() {
        this.layoutHeader = document.getElementById('layoutHeader');
        this.clock = document.getElementById('clock');
        this.clock.innerHTML = this.timeFormatter();
        this.runClock();
        eventBinder(window, 'scroll', this.hiddenHeader.bind(this));
    }

    runClock() {
        this.timer = setInterval(() => {
            this.clock.innerHTML = this.timeFormatter();
        }, 1000);
    }

    timeFormatter() {
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

    hiddenHeader(e) {
        if (window.scrollY > 0) {
            this.layoutHeader.style.opacity = 0;
            this.layoutHeader.style.zIndex = -1;
        } else if (window.scrollY <= 0) {
            this.layoutHeader.style.opacity = 1;
            this.layoutHeader.style.zIndex = 2;
        }
    }
}


eventBinder(window, 'load', new Layout());