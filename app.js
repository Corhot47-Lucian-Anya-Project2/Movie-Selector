// Declare global variables
let likedMovies = []; // Array to hold liked movies
const maxLikedMovies = 5; // Maximum number of liked movies

// Function to fetch movie data from API
function fetchMovie() {
  const apiKey = "a86709241fa3002625b118e87d177b48";
  const baseUrl = "https://api.themoviedb.org/3";
  const page = Math.floor(Math.random() * 500);
  const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayMovie(data.results[0]))
    .catch(error => console.log(error)); // Handle errors
}

// Function to display movie data
function displayMovie(movie) {
  const imageContainer = document.querySelector(".imageContainer");
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const title = movie.title;
  const image = document.createElement("img"); // Create an <img> element
  image.src = posterUrl; // Set the source of the <img> element
  image.alt = `${title} poster`; // Set the alt text of the <img> element
  imageContainer.innerHTML = ""; // Clear the contents of the image container
  imageContainer.appendChild(image); // Add the <img> element to the image container
  document.querySelector(".movieName").textContent = title;
}

// Function to add movie to liked movies list
function addLikedMovie(movie) {
  let isDuplicate = false;
  for (let i = 0; i < likedMovies.length; i++) {
    if (likedMovies[i].title === movie.title) {
      isDuplicate = true;
      break;
    }
  }
  if (!isDuplicate && likedMovies.length < maxLikedMovies) {
    likedMovies.push(movie);
    const likedMoviesList = document.querySelector("#likedMovies");
    const listItem = document.createElement("li");
    listItem.textContent = movie.title;
    likedMoviesList.appendChild(listItem);

    if (likedMovies.length === maxLikedMovies) {
      alert("You have liked 5 movies. You cannot like any more movies.");
      const likeButton = document.querySelector(".like");
      likeButton.disabled = true;
    }
  }
}


// Function to remove movie from suggestions
function removeMovie() {
  const imageContainer = document.querySelector(".imageContainer");
  imageContainer.innerHTML = "";
  document.querySelector(".movieName").textContent = "";
}

// Event listener for dislike button
const dislikeButton = document.querySelector(".dislike");
dislikeButton.addEventListener("click", function() {
  removeMovie();
  fetchMovie();
});

// Event listener for like button
const likeButton = document.querySelector(".like");
likeButton.addEventListener("click", function() {
  const currentMovie = document.querySelector(".movieName").textContent;
  const movieObj = { title: currentMovie };
  addLikedMovie(movieObj);
  removeMovie();
  fetchMovie();
});

// Initial fetch
fetchMovie();


