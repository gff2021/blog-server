eventBinder(window, 'load', () => {
    const container = document.getElementById('journalListContainer');

    function renderJournalList(dataList) {
        container.innerHTML = '';
        dataList.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <p class="log-abstract">${item.abstract}</p>
                <p class="log-content">${item.content ? item.content : ''}</p>
                <p class="log-date">发布于${item.createTime}</p>
            `;
            container.appendChild(li);
        })
    }

    new Pagination('/blog/journal/reqJournalData', renderJournalList)
})