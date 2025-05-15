function loadMedia()
{
	console.log("Error checkpoint 1")
	fetch('../data/data.json')
	.then(function(response)
	{
		return response.json();
	}
	)
	.then(function(mediaData)
	{
		displayMovies(mediaData.movies);
		displayShows(mediaData.shows);
	}
	)
	.catch(function(error)
	{
		console.error('Cannot load data:', error);
	}
	);
}

function displayMovies(movies)
{
	let movieHTML = '';
	for (let i = 0; i < movies.length; i++)
	{
		let movie = movies[i];
		movieHTML += '<div class="column">';
		movieHTML += '<div class="image-container">';
		// Info card with rating inline using span, no separate rating div
		movieHTML += '<div class="movie-info-card">';
		movieHTML += '<p><strong>IMDb:</strong> <span class="rating">' + movie.rating + '</span></p>';
		movieHTML += '<p><strong>Genre:</strong> ' + movie.genre + '</p>';
		movieHTML += '<p><strong>Year:</strong> ' + movie.year + '</p>';
		movieHTML += '</div>';
		movieHTML += '<a href="' + movie.link + '" target="_blank">';
		movieHTML += '<img src="' + movie.image + '" alt="' + movie.title + '">';
		movieHTML += '</a>';
		movieHTML += '</div>';
		movieHTML += '<h2 class="movie-title">' + movie.title + '</h2>';
		movieHTML += '</div>';
	}
	document.getElementById("movies-container").innerHTML = movieHTML;
}


function displayShows(shows)
{
	let showHTML = '';
	for (let i = 0; i < shows.length; i++)
	{
		let show = shows[i];
		showHTML += '<div class="column">';
		showHTML += '<a href="' + show.link + '"target="_blank">';
		showHTML += '<div class="image-container">';
		showHTML += '<img src="' + show.image + '" alt="' + show.title + '">';
		showHTML += '<div class="rating">' + show.rating + '</div>';
		showHTML += '</div>';
		showHTML += '<h2 class="movie-title">' + show.title + '</h2>';
		showHTML += '</a>';
		showHTML += '</div>';
	}
	document.getElementById("shows-container").innerHTML = showHTML;
}

function scrollBtnRight(containerId) 
{
	document.getElementById(containerId).scrollBy({ left: 1374, behavior: 'smooth' });
	console.log("Does scrollRight Button Work?");
}

function scrollBtnLeft(containerId) 
{
	document.getElementById(containerId).scrollBy({ left: -1374, behavior: 'smooth' });
	console.log("Does scrollLeft Button Work?");
}

window.onload = loadMedia;