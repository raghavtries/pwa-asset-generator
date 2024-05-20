document.addEventListener("DOMContentLoaded", function() {
    const csvFilePath = 'data/people.csv';
    const slideShowContainer = document.getElementById('person-slideshow');
    const slideshowInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    fetch(csvFilePath)
        .then(response => response.text())
        .then(data => {
            const parsedData = parseCSV(data);
            displayPerson(parsedData);
        })
        .catch(error => console.error('Error loading CSV:', error));

    function parseCSV(data) {
        const rows = data.split('\n').slice(1);
        return rows.map(row => {
            const [name, image, bio] = row.split(',');
            return { name, image, bio };
        });
    }

    function displayPerson(data) {
        const today = new Date();
        const index = today.getDate() % data.length;
        const person = data[index];

        const personDiv = document.createElement('div');
        personDiv.classList.add('person', 'active');
        personDiv.innerHTML = `
            <h2>${person.name}</h2>
            <img src="data/images/${person.image}" alt="${person.name}">
            <p>${person.bio}</p>
        `;

        slideShowContainer.appendChild(personDiv);
    }
});
