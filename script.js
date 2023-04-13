async function fetchData() {
    const url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.json';
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Convert the object values to an array
        return Object.values(data);

    } else {
        console.error('Error: Unable to fetch data from API');
        return null;
    }

}


function insertDataToTable(data) {
    const table = document.querySelector('#data-table tbody');
    table.innerHTML = '';

    if (!Array.isArray(data)) {
        console.error('Error: Data is not iterable or in the expected format');
        return;
    }

    for (let index=0; index<data.length; index++) {
        const row=data[index];
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${row.name}</td>
            <td>${row.author}</td>
            <td>${row.language}</td>
            <td> <a href='${row.source}' target='_blank'>visit the website</a></td>
        `;
        table.appendChild(tr);
    }
}

function searchFilter(data, query) {
    return data.filter(item => {
        const searchString = `${item.author} ${item.name} ${item.language} ${item.source}`.toLowerCase();
        return searchString.includes(query.toLowerCase());
    });
}

// Add event listener to the search button
document.querySelector('#search-button').addEventListener('click', () => {
    const query = document.querySelector('#search-input').value;
    const filteredData = searchFilter(allData, query);
    insertDataToTable(filteredData);
});

(async () => {
    allData = await fetchData();
    insertDataToTable(allData);
})();


async function loadData() {
    const data = await fetchData();
    insertDataToTable(data);
}

// Load data when the page loads
loadData();
