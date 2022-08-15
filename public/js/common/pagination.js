const ajax = new Ajax();

class Pagination {
    constructor(url, callback) {
        this.pagination = document.getElementById('pagination');
        this.pageNo = 1; // 当前页码
        this.pageSize = 6; // 每页条数
        this.totalPage = null; // 总页数
        this.leftArrowText = '◀'; // 上一页按钮文本
        this.rightArrowText = '▶'; // 下一页按钮文本
        this.url = url; // 数据接口路径
        this.dataList = []; // 数据列表
        this.renderDataList = callback; // 该回调用于渲染数据列表，由Pagination类外部传入
        this.init();
    }

    // 初始化函数
    init() {
        const {pagination, getData} = this;
        pagination.style = 'text-align: center';
        getData.apply(this);
    }

    // 获取分页器数据及列表数据
    getData() {
        const {pageNo, pageSize, url, render, renderDataList} = this;
        const params = {
            pageNo,
            pageSize
        }
        ajax.getParams(url, params).then((res) => {
            const {result: {dataList, pageInfo: {totalPage}}} = JSON.parse(res);
            this.totalPage = totalPage;
            render.call(this, totalPage);
            renderDataList(dataList);
        })
    }

    // 分页器渲染函数
    render(totalPage) {
        const {pagination, pageNo, leftArrowText, rightArrowText} = this;
        new Button(leftArrowText, this).render(pagination);
        if (totalPage <= 11) {
            for (let i = 1; i <= totalPage; i++) {
                new Button(i, this).render(pagination);
            }
        } else {
            if (pageNo <= 5 || pageNo >= totalPage - 4) {
                for (let i = 1; i <= 6; i++) {
                    new Button(i, this).render(pagination);
                }
                new Button('...', this).render(pagination);
                for (let i = totalPage - 5; i <= totalPage; i++) {
                    new Button(i, this).render(pagination);
                }
            } else {
                for (let i = 1; i <= 3; i++) {
                    new Button(i, this).render(pagination);
                }
                new Button('...', this).render(pagination);
                for (let i = pageNo - 1; i <= pageNo + 1; i++) {
                    new Button(i, this).render(pagination);
                }
                new Button('...', this).render(pagination);
                for (let i = totalPage - 2; i <= totalPage; i++) {
                    new Button(i, this).render(pagination);
                }
            }
        }
        new Button(rightArrowText, this).render(pagination);
    }
}

class Button {
    constructor(inner, that) {
        this.button = document.createElement('button');
        this.inner = inner; // 按钮内容
        this.container = that; // pagination实例
        this.initialStyle = [
            ['width', '30px'],
            ['height', '30px'],
            ['border', '1px solid #fff'],
            ['border-radius', '5px'],
            ['background-color', 'transparent'],
            ['color', '#fff'],
            ['margin', '0 10px'],
            ['transition', 'all .5s']
        ]; // 初始样式
        this.hoverStyle = [
            ['width', '30px'],
            ['height', '30px'],
            ['border', '1px solid dodgerblue'],
            ['border-radius', '5px'],
            ['background-color', 'transparent'],
            ['color', 'dodgerblue'],
            ['margin', '0 10px'],
        ]; // 激活样式
        this.disabledStyle = [
            ['width', '30px'],
            ['height', '30px'],
            ['border', '1px solid #fff'],
            ['border-radius', '5px'],
            ['background-color', 'transparent'],
            ['color', '#fff'],
            ['margin', '0 10px'],
            ['cursor', 'not-allowed']
        ]; // 禁用样式
        this.init();
        return this;
    }

    init() {
        const {button, inner} = this;
        button.innerHTML = inner + '';
        this.beforeRender();
    }

    // 样式数组处理函数
    mapStyleArrToStr(styleArr) {
        return styleArr.reduce((previous, current) => {
            return previous + current.join(':') + ';'
        }, '')
    }

    // 添加样式，注册事件
    beforeRender() {
        const {button, inner, container, initialStyle, hoverStyle, disabledStyle, mapStyleArrToStr} = this;
        const {pageNo, totalPage, leftArrowText, rightArrowText} = container;
        if (inner === pageNo) {
            button.style = mapStyleArrToStr(hoverStyle);
        } else {
            button.style = mapStyleArrToStr(initialStyle);
            button.addEventListener('mouseenter', () => {
                button.style = mapStyleArrToStr(hoverStyle);
            }); // 绑定鼠标移入事件
            button.addEventListener('mouseleave', () => {
                button.style = mapStyleArrToStr(initialStyle);
            }); // 绑定鼠标移出事件
        };
        if (inner !== '...') {
            button.addEventListener('click', () => {
                container.pagination.innerHTML = '';
                if (inner === container.leftArrowText) {
                    container.pageNo -= 1;
                } else if (inner === container.rightArrowText) {
                    container.pageNo += 1;
                } else {
                    container.pageNo = inner;
                }
                container.getData();
            });
        };
        if ((inner === leftArrowText && pageNo === 1) || (inner === rightArrowText && pageNo === totalPage)) {
            button.disabled = true;
            button.style = mapStyleArrToStr(disabledStyle);
        }
    }

    // 渲染
    render(container) {
        const {button} = this;
        container.appendChild(button);
    }
}