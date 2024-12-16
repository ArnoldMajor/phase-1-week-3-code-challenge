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
    const filmsButton = document.getElementById('nav-films');
    const filmsList = document.getElementById('films');

    fetchOneMovie(1);
    let listLoaded = true;
    fetchMovieTitles();



    filmsButton.addEventListener('click', () => {
        filmsButton.classList.toggle('active');
        if (listLoaded) {
            const filmItem = document.querySelectorAll('.movie-list');
            for (const item of filmItem) {
                item.remove()
                filmsList.style.marginTop = '0px';
                filmsList.style.marginBottom = '0px';
            }
            listLoaded = false;
            return
        } fetchMovieTitles();
    })


    function fetchMovieTitles() {
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
                linkFilmList()
            })
    }

    function fetchOneMovie(id) {
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


                if (ticketDiff < 1) {
                    bookButton.innerText = 'Sold Out'
                    bookButton.classList.add('soldout')
                    bookButton.disabled = true;
                }

                bookButton.addEventListener('click', () => {
                    if (ticketDiff >= 1) {
                        data.tickets_sold++;
                        ticketDiff = data.capacity - data.tickets_sold;
                        if (ticketDiff < 1) {
                            bookButton.innerText = 'Sold Out'
                            bookButton.classList.add('soldout')
                            bookButton.disabled = true;
                        }
                        availableTickets.innerHTML = `<span>Available Tickets: </span>${ticketDiff}`
                    }
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


    function linkFilmList() {
        let arr = [];
        filmsList.children[0].classList.add('text-active')
        for (const item of filmsList.children) {
            arr.push(item.textContent)
            item.addEventListener('click', () => {
                fetchOneMovie(arr.indexOf((item.textContent)) + 1)
                for (const item of filmsList.children) {
                    item.classList.remove('text-active')
                }
                item.classList.add('text-active')

            })
        }
    }
})

