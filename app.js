// // Get references to the DOM elements
// const movieNameEl = document.querySelector('.movieName');
// const imageContainerEl = document.querySelector('.imageContainer');
// const dislikeBtn = document.querySelector('.dislike');
// const likeBtn = document.querySelector('.like');
// const likedMoviesList = document.querySelector('#likedMovies');
// // Listen for click events on the dislike and like buttons
// dislikeBtn.addEventListener('click', handleDislikeButtonClick);
// likeBtn.addEventListener('click', handleLikeButtonClick);
// // Display a random movie on page load
// displayRandomMovie();

// // Keep track of the movies that have already been shown
// const shownMovies = [];

// // Define a function to display a random movie
// function displayRandomMovie() {
// //   Call the API to get the list of top rated movies
//   fetch('https://api.themoviedb.org/3/discover/movie?api_key=a86709241fa3002625b118e87d177b48&sort_by=popularity.desc&page=2&vote_count.gte=1000')
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       // Filter out the movies that have already been shown
//       const unshownMovies = data.results.filter(function(movie) {
//         return !shownMovies.includes(movie.title);
//       });

//       // Check if there are any movies left to show
//       if (unshownMovies.length === 0) {
//         alert('You have seen all the movies!');
//         return;
//       }

//       // Get a random movie from the list of unshown movies
//       const randomIndex = Math.floor(Math.random() * unshownMovies.length);
//       const randomMovie = unshownMovies[randomIndex];

//       // Add the movie to the list of shown movies
//       shownMovies.push(randomMovie.title);

//       // Display the random movie poster and name
//       const movieNameEl = document.querySelector('.movieName');
//       const imageContainerEl = document.querySelector('.imageContainer');
//       movieNameEl.textContent = randomMovie.title;
//       imageContainerEl.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${randomMovie.poster_path}" alt="${randomMovie.title}">`;
//     });
// }

// // Define an event handler function for the dislike button
// function handleDislikeButtonClick() {
//   // Display a new random movie
//   displayRandomMovie();
// }
// // Define an event handler function for the like button
// function handleLikeButtonClick() {
//   // Get the current movie name
//   const movieName = movieNameEl.textContent;
  
//   // Check if the number of liked movies is already 15
//   if (likedMoviesList.children.length >= 15) {
//     alert('You can only have up to 15 liked movies!');
//     return;
//   }

//   // Create a new list item with the movie name and append it to the list of liked movies
//   const newListItem = document.createElement('li');
//   newListItem.textContent = movieName;
//   likedMoviesList.appendChild(newListItem);
  
//   // Display a new random movie
//   displayRandomMovie();
// }



// Function to fetch a random movie from the MovieDB API
function getRandomMovie() {
  // API key provided by MovieDB
  const apiKey = "a86709241fa3002625b118e87d177b48";
  // Fetch popular movies from the API
  return fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Pick a random movie from the results
      const movie = data.results[Math.floor(Math.random() * data.results.length)];
      return movie;
    });
}

// Function to display the movie poster and title
function displayMovie(movie) {
  // Get the image container and movie name elements from the HTML
  const imageContainer = document.querySelector(".imageContainer");
  const movieName = document.querySelector(".movieName");
  // Create an image element and set its source to the movie poster
  const image = document.createElement("img");
  image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  // Clear the image container and add the new image
  imageContainer.innerHTML = "";
  imageContainer.appendChild(image);
  // Set the movie name to the title of the movie
  movieName.textContent = movie.title;
}

// Get the dislike and like buttons from the HTML
const dislikeButton = document.querySelector(".dislike");
const likeButton = document.querySelector(".like");

// Array to store the movies the user has liked
const likedMovies = [];

// Event listener for the dislike button
dislikeButton.addEventListener("click", () => {
  // Get a random movie from the API and display it
  getRandomMovie().then(movie => displayMovie(movie));
});

// Event listener for the like button
likeButton.addEventListener("click", () => {
  // Get a non-repeating movie from the API and add it to the liked movies array
  getNonRepeatingMovie().then(movie => {
    likedMovies.push(movie);
    // Get the HTML element for the list of liked movies and create a new list item for the new movie
    const likedMoviesList = document.querySelector("#likedMovies");
    const movieElement = document.createElement("li");
    movieElement.textContent = movie.title;
    // Add the new list item to the list of liked movies
    likedMoviesList.appendChild(movieElement);
    // Display the new movie poster and title
    displayMovie(movie);
  });
});

// Function to get a non-repeating movie from the MovieDB API
function getNonRepeatingMovie() {
  // Get a random movie
  return getRandomMovie().then(function(movie) {
    // Check if the movie already exists in the list of liked movies
    while (true) {
      let exists = false;

      // Loop through each movie in the list of liked movies
      for (let i = 0; i < likedMovies.length; i++) {
        if (likedMovies[i].id === movie.id) {
          // If the movie already exists in the list of liked movies, set exists to true and break out of the loop
          exists = true;
          break;
        }
      }

      // If the movie doesn't exist in the list of liked movies, return it
      if (!exists) {
        return movie;
      }

      // If the movie already exists in the list of liked movies, get another random movie and check again
      movie = getRandomMovie();
    }
  });
}

// Display a random movie when the page loads
getRandomMovie().then(function(movie) {
  displayMovie(movie);
});

// slide out menu code:

// create query selector for button
// value of true or false to keep track or if button is hidden
// listen for button click
// depending on which button is clicked hide or show menu

// value to keep track of whether menu is open or not (by default menu is open)
let isOpen = true;

// select the open and close menu buttons
const openMenuButton = document.getElementById('openButton');
const closeMenuButton = document.getElementById('closeButton');

openMenuButton.addEventListener("click", () => {
  document.getElementById("slideoutMenu").style.display = "flex";
});

closeMenuButton.addEventListener("click", () => {
  document.getElementById("slideoutMenu").style.display = "none";
});


// openMenuButton.addEventListener('click', openMenu());
// closeMenuButton.addEventListener('click', closeMenu());
