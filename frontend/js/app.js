function loadMedia()
{
	console.log("Error checkpoint 1")
	fetch('../data/data.json')
	.then(function(response)
	{
		return response.json();
	})
	.then(function(mediaData)
	{
		displayMovies(mediaData.movies);
		displayShows(mediaData.shows);
	})
	.catch(function(error)
	{
		console.error('Cannot load data:', error);
	});
}

function displayMovies(movies)
{
	let movieHTML = '';
	for (let i = 0; i < movies.length; i++)
	{
		let movie = movies[i];
		// Add HTML for this movie
		movieHTML += '<div class="column">';
		movieHTML += '<a href="' + movie.link + '"target="_blank">';
		movieHTML += '<div class="image-container">';
		movieHTML += '<img src="' + movie.image + '" alt="' + movie.title + '">';
		movieHTML += '<div class="rating">' + movie.rating + '</div>';
		movieHTML += '</div>';
		movieHTML += '<p class="movie-title">' + movie.title + '</p>';
		movieHTML += '</a>';
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
		// Add HTML for this show
		showHTML += '<div class="column">';
		showHTML += '<a href="' + show.link + '"target="_blank">';
		showHTML += '<div class="image-container">';
		showHTML += '<img src="' + show.image + '" alt="' + show.title + '">';
		showHTML += '<div class="rating">' + show.rating + '</div>';
		showHTML += '</div>';
		showHTML += '<p class="movie-title">' + show.title + '</p>';
		showHTML += '</a>';
		showHTML += '</div>';
	}
	document.getElementById("shows-container").innerHTML = showHTML;
}
window.onload = loadMedia;