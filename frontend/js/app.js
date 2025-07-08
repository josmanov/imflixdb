function load_media()
{
	fetch('../data/data.json')
	.then(function(response)
	{
		return response.json();
	}
	)
	.then(function(media_data)
	{
		display_movies(media_data.movies);
		display_shows(media_data.shows);
	}
	)
	.catch(function(error)
	{
		console.error('Cannot load data:', error);
	}
	);
}

function display_movies(movies)
{
	let movie_html = '';
	for (let i = 0; i < movies.length; i++)
	{
		const movie_list = movies[i];
		movie_html += '<div class="column">';
		movie_html += '<div class="image_container">';
		// Info card with rating inline using span, no separate rating div
		movie_html += '<div class="movie_info_card">';
		movie_html += '<p><strong>IMDb:</strong> <span class="rating">' + movie_list.rating + '</span></p>';
		movie_html += '<p><strong>Genre:</strong> ' + movie_list.genre + '</p>';
		movie_html += '<p><strong>Year:</strong> ' + movie_list.year + '</p>';
		movie_html += '</div>';
		movie_html += '<a href="' + movie_list.link + '" target="_blank">';
		movie_html += '<img src="' + movie_list.image + '" alt="' + movie_list.title + '">';
		movie_html += '</a>';
		movie_html += '</div>';
		movie_html += '<h2 class="movie_title">' + movie_list.title + '</h2>';
		movie_html += '</div>';
	}
	const movies_container = document.getElementById("movies_container");
	movies_container.innerHTML = movie_html;
}

function display_shows(shows)
{
	let show_html = '';
	for (let i = 0; i < shows.length; i++)
	{
		const show_list = shows[i];
		show_html += '<div class="column">';
		show_html += '<a href="' + show_list.link + '" target="_blank">';
		show_html += '<div class="image_container">';
		show_html += '<img src="' + show_list.image + '" alt="' + show_list.title + '">';
		show_html += '<div class="rating">' + show_list.rating + '</div>';
		show_html += '</div>';
		show_html += '<h2 class="movie_title">' + show_list.title + '</h2>';
		show_html += '</a>';
		show_html += '</div>';
	}
	document.getElementById("shows_container").innerHTML = show_html;
}

function scroll_btn_right(container_id) 
{
	const scroll_amount = 1374;
	document.getElementById(container_id).scrollBy({ left: scroll_amount, behavior: 'smooth' });
	console.log("Does scroll_right Button Work?");
}

function scroll_btn_left(container_id) 
{
	const scroll_amount = -1374;
	document.getElementById(container_id).scrollBy({ left: scroll_amount, behavior: 'smooth' });
	console.log("Does scroll_left Button Work?");
}

window.onload = load_media;