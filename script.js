document.addEventListener('DOMContentLoaded', () => {
    const bodyContainer = document.getElementById('container');
    const movieCard = document.createElement('div');
    const imageSect = document.createElement('div');
    const infoSect = document.createElement('div')
    const moviePoster = document.createElement('img');
    const movieTitle = document.createElement('h1');
    const movieDescription = document.createElement('p');
    const runtime = document.createElement('p');
    const bookButton = document.createElement('button');

    fetch('http://localhost:3000/films/1')
        .then(res => res.json())
        .then(data => {
            bodyContainer.appendChild(movieCard);
            movieCard.className = 'movie-card';
            movieCard.appendChild(imageSect);
            movieCard.appendChild(infoSect);

            imageSect.className = 'image-section';
            imageSect.appendChild(moviePoster);
            moviePoster.src = data.poster;
            moviePoster.className = 'movie-poster';

            infoSect.className = 'info-section';
            infoSect.appendChild(movieTitle);
            movieTitle.className = 'movie-title';
            movieTitle.textContent = data.title;

            infoSect.appendChild(movieDescription);
            movieDescription.className = 'movie-description';
            movieDescription.textContent = data.description;

            infoSect.appendChild(runtime);
            runtime.className = 'runtime';
            runtime.textContent = data.runtime;

            infoSect.appendChild(bookButton);
            bookButton.className = 'book-button';
            bookButton.innerText = 'Book Movie';

        })
})