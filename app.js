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

// Define a function to display a random movie
function displayRandomMovie() {
  // Call the API to get the list of top 250 movies
  fetch('https://imdb-api.com/en/API/Top250Movies/k_5bazrxnv')
    .then(response => {
      // Convert the response data to JSON
      return response.json();
    })
    .then(data => {
      // Get a random movie from the list of top 250 movies
      const randomIndex = Math.floor(Math.random() * data.items.length);
      const randomMovie = data.items[randomIndex];
      // Update the movie name and image elements with the new movie data
      movieNameEl.textContent = randomMovie.title;
      imageContainerEl.innerHTML = `<img src="${randomMovie.image}" alt="${randomMovie.title}">`;
    });
}

// Define an event handler function for the dislike button
function handleDislikeButtonClick() {
  // Display a new random movie
  displayRandomMovie();
}

// Define an event handler function for the like button
function handleLikeButtonClick() {
  // Get the current movie name
  const movieName = movieNameEl.textContent;
  // Create a new list item with the movie name and append it to the list of liked movies
  const newListItem = document.createElement('li');
  newListItem.textContent = movieName;
  likedMoviesList.appendChild(newListItem);
  // Display a new random movie
  displayRandomMovie();
}

