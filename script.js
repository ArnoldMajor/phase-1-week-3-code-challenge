document.addEventListener('DOMContentLoaded', () => {
    const bodyContainer = document.getElementById('movie-container');
    const movieCard = document.createElement('div');
    const imageSect = document.createElement('div');
    const infoSect = document.createElement('div')
    const moviePoster = document.createElement('img');
    const movieTitle = document.createElement('h1');
    const movieDescription = document.createElement('p');
    const runtime = document.createElement('p');
    const showtime = document.createElement('p');
    const availableTickets = document.createElement('p');
    const bookButton = document.createElement('button');
    const navButtons = document.querySelectorAll('.nav-item');
    const homeButton = document.getElementById('nav-home');
    const filmsButton = document.getElementById('nav-films');
    const soldoutButton = document.getElementById('nav-soldout');
    const filmsList = document.getElementById('films');

    const fetchOneMovie = (id) => {
        fetch(`http://localhost:3000/films/${id}`)
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
                runtime.innerHTML = `<span>Runtime: </span>${data.runtime} minutes`;

                infoSect.appendChild(showtime);
                showtime.className = 'showtime';
                showtime.innerHTML = `<span>Showtime: </span>${data.showtime}`;

                infoSect.appendChild(availableTickets);
                availableTickets.className = 'available-tickets';
                let ticketDiff;
                ticketDiff = data.capacity - data.tickets_sold;
                availableTickets.innerHTML = `<span>Available Tickets: </span>${ticketDiff}`

                infoSect.appendChild(bookButton);
                bookButton.className = 'book-button';
                bookButton.innerText = 'Book Movie';


                bookButton.addEventListener('click', () => {
                    data.tickets_sold++;
                    ticketDiff = data.capacity - data.tickets_sold;
                    availableTickets.innerHTML = `<span>Available Tickets: </span>${ticketDiff}`
                    fetch(`http://localhost:3000/films/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                })

            })
    }

    fetchOneMovie(1);
    let listLoaded = false;

    for (const button of navButtons) {
        button.addEventListener('click', () => {
            for (const button of navButtons) {
                button.classList.remove('active')
            }
            button.classList.add('active')
        })
    }


    filmsButton.addEventListener('click', () => {
        bodyContainer.remove()
        if (listLoaded) {
            const filmItem = document.querySelectorAll('.movie-list');
            for (const item of filmItem) {
                item.remove()
                filmsList.style.marginTop = '0px';
                filmsList.style.marginBottom = '0px';
            }
            listLoaded = false;
            return
        };

        fetch('http://localhost:3000/films')
            .then(res => res.json())
            .then(data => {
                for (const item of data) {
                    const filmItem = document.createElement('li');
                    filmsList.appendChild(filmItem);
                    filmItem.innerText = item.title;
                    filmItem.className = 'movie-list';
                    filmsList.style.marginTop = '50px';
                    filmsList.style.marginBottom = '50px';
                }
                listLoaded = true;
            })

    })

})

