// Get references to the DOM elements
const movieNameEl = document.querySelector('.movieName');
const imageContainerEl = document.querySelector('.imageContainer');
const dislikeBtn = document.querySelector('.dislike');
const likeBtn = document.querySelector('.like');
const likedMoviesList = document.querySelector('#likedMovies');
// Listen for click events on the dislike and like buttons
dislikeBtn.addEventListener('click', handleDislikeButtonClick);
likeBtn.addEventListener('click', handleLikeButtonClick);
// Display a random movie on page load
displayRandomMovie();

// Keep track of the movies that have already been shown
const shownMovies = [];

// Define a function to display a random movie
function displayRandomMovie() {
  // Call the API to get the list of top rated movies
  fetch('https://api.themoviedb.org/3/movie/popular?api_key=a86709241fa3002625b118e87d177b48&page=10')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Filter out the movies that have already been shown
      const unshownMovies = data.results.filter(function(movie) {
        return !shownMovies.includes(movie.title);
      });

      // Check if there are any movies left to show
      if (unshownMovies.length === 0) {
        alert('You have seen all the movies!');
        return;
      }

      // Get a random movie from the list of unshown movies
      const randomIndex = Math.floor(Math.random() * unshownMovies.length);
      const randomMovie = unshownMovies[randomIndex];

      // Add the movie to the list of shown movies
      shownMovies.push(randomMovie.title);

      // Display the random movie poster and name
      const movieNameEl = document.querySelector('.movieName');
      const imageContainerEl = document.querySelector('.imageContainer');
      movieNameEl.textContent = randomMovie.title;
      imageContainerEl.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${randomMovie.poster_path}" alt="${randomMovie.title}">`;
    });
}












// function displayRandomMovie() {
  // Call the API to get the list of movies
//   fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=a86709241fa3002625b118e87d177b48')
//     .then(response => {
//       // Convert the response data to JSON
//       return response.json();
//     })
//     .then(data => {
//       // Get a random movie from the list of movies
//       const randomIndex = Math.floor(Math.random() * data.results.length);
//       const randomMovie = data.results[randomIndex];
//       // Update the movie name and image elements with the new movie data
//       movieNameEl.textContent = randomMovie.title;
//       imageContainerEl.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${randomMovie.poster_path}" alt="${randomMovie.title}">`;
//     });
// }

// Define an event handler function for the dislike button
function handleDislikeButtonClick() {
  // Display a new random movie
  displayRandomMovie();
}
// Define an event handler function for the like button
function handleLikeButtonClick() {
  // Get the current movie name
  const movieName = movieNameEl.textContent;
  
  // Check if the number of liked movies is already 15
  if (likedMoviesList.children.length >= 15) {
    alert('You can only have up to 15 liked movies!');
    return;
  }

  // Create a new list item with the movie name and append it to the list of liked movies
  const newListItem = document.createElement('li');
  newListItem.textContent = movieName;
  likedMoviesList.appendChild(newListItem);
  
  // Display a new random movie
  displayRandomMovie();
}
