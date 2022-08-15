class Ajax {
    constructor() {
        this.xmlHttp = null;
        this.init();
    }

    init() {
        const that = this;
        if (window.XMLHttpRequest) {
            this.xmlHttp = new XMLHttpRequest();
        } else {
            this.xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        };
    }

    getParams(url, params) {
        const paramsStr = Object.entries(params).reduce((previous, current) => {
            return previous + current.join('=') + '&'
        }, '?');
        const queryStr = paramsStr.slice(0, paramsStr.length - 1);
        this.xmlHttp.open('GET', url + queryStr);
        this.xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        this.xmlHttp.send();
        return new Promise((resolve, reject) => {
            this.xmlHttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let data = this.responseText;
                    resolve(data);
                }
            }
        });
    }

    postJson(url, params) {
        this.xmlHttp.open('POST', url);
        this.xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        this.xmlHttp.send(params);
        return new Promise((resolve, reject) => {
            this.xmlHttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let data = this.responseText;
                    resolve(data);
                }
            }
        });
    }
}