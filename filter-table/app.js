var app = angular.module('ngApp', [])


app.controller('controller', ['$scope', async function ($scope) {
    const dataCategories = await callData();

    createInput({ dataCategories: dataCategories });
    tableCreate({ data: dataCategories });
}])


async function callData() {
    try {
        let data = [];
        await fetch('https://api.publicapis.org/categories')
            .then(res => res.json())
            .then((response) => {
                for (i in response) {
                    data.push(response[i]);
                }
            });
        return data;
    } catch (e) {
        console.error(e);
        return [];
    }

}

function createInput({ dataCategories }) {
    const input = document.querySelector('.input-search');
    input.addEventListener('input', () => {
        let inputValue = input.value.toUpperCase();
        var body = document.querySelector('.table');
        var table = document.querySelector('table');

        let newDataFilter = dataCategories.filter(item => {
            return (item || '').toUpperCase().indexOf(inputValue) > -1
        })
        body.removeChild(table);
        tableCreate({ data: newDataFilter });

    })
}

function tableCreate({ data }) {
    var body = document.querySelector('.table');
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    var th = document.createElement('thead');
    var h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode('Categories'))
    th.appendChild(h1);
    th.style.textAlign = 'center';

    for (i in data) {
        let value = data[i]
        var tr = document.createElement('tr');
        var td = document.createElement('td');

        td.appendChild(document.createTextNode(value));
        td.style.textAlign = 'center';
        tr.appendChild(td)
        tbdy.appendChild(tr);
    }
    tbl.appendChild(th)
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}