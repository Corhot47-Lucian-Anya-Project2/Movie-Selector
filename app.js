// MovieApp object declaration
const MovieApp = {};

// Array to store liked movies and maximum liked movies limit
MovieApp.likedMovies = [];
MovieApp.maxLikedMovies = 5;

// Function to fetch a random movie from the API
MovieApp.fetchMovie = function() {
  const apiKey = "a86709241fa3002625b118e87d177b48";
  const baseUrl = "https://api.themoviedb.org/3";
  const page = Math.floor(Math.random() * 500);
  const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

  // Fetch movie data from the API
  fetch(url)
    .then(response => response.json())
    .then(data => this.displayMovie(data.results[0]))
    .catch(error => console.log(error)); // Handle errors
};

// Function to display movie information on the page
MovieApp.displayMovie = function(movie) {
  const imageContainer = document.querySelector(".imageContainer");
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const title = movie.title;
  const image = document.createElement("img"); // Create an <img> element
  image.src = posterUrl; // Set the source of the <img> element
  image.alt = `${title} poster`; // Set the alt text of the <img> element
  imageContainer.innerHTML = ""; // Clear the contents of the image container
  imageContainer.appendChild(image); // Add the <img> element to the image container
  document.querySelector(".movieName").textContent = title; // Update the movie title on the page
};

// Function to add a liked movie to the likedMovies array and display it in the liked movies list
MovieApp.addLikedMovie = function(movie) {
  // Check if the movie is already in the likedMovies array
  let isDuplicate = false;
  for (let i = 0; i < this.likedMovies.length; i++) {
    if (this.likedMovies[i].title === movie.title) {
      isDuplicate = true;
      break;
    }
  }

  // Add the movie to the likedMovies array and update the liked movies list
  if (!isDuplicate && this.likedMovies.length < this.maxLikedMovies) {
    this.likedMovies.push(movie);
    const likedMoviesList = document.querySelector("#likedMovies");
    const listItem = document.createElement("li");
    listItem.textContent = movie.title;
    likedMoviesList.appendChild(listItem);

    // Show an alert when the maximum number of liked movies has been reached
    if (this.likedMovies.length === this.maxLikedMovies) {
      alert("You have liked 5 movies. You cannot like any more movies.");
      const likeButton = document.querySelector(".like");
      likeButton.disabled = true;
    }
  }
};

// Function to remove the current movie from the display
MovieApp.removeMovie = function() {
  const imageContainer = document.querySelector(".imageContainer");
  imageContainer.innerHTML = "";
  document.querySelector(".movieName").textContent = "";
};

// Variable to track if the first movie has been liked
MovieApp.likedFirstMovie = false;

// Function to open the slideout menu for the first time when the first movie is liked
MovieApp.openMenuFirst = function () {
  if (MovieApp.likedFirstMovie == false) {
    if (window.innerWidth > 700) {
      document.getElementById("slideoutMenu").style.width = "300px";
    } else {
      document.getElementById("slideoutMenu").style.width = "100vw";
    }
  }
  MovieApp.likedFirstMovie = true;
};

// Namespace for utility functions related to MovieApp
const MovieAppUtils = {
  openMenuFirst: function() {
    if (!MovieApp.likedFirstMovie) {
      if (window.innerWidth > 700) {
        document.getElementById("slideoutMenu").style.width = "300px";
      } else {
        document.getElementById("slideoutMenu").style.width = "100vw";
      }
    }
    MovieApp.likedFirstMovie = true;
  },
};

// Namespace for slide out menu related functions
const SlideOutMenu = {
  openMenuButton: null,
  closeMenuButton: null,

  // Function to close the slide out menu
  closeMenu: function() {
    document.getElementById("slideoutMenu").style.width = "0";
  },

  // Function to handle media query related functionality for the slide out menu
  mediaQuery: function () {
    let mq = window.matchMedia('(max-width: 700px)');
    // if screen size is less than 700px
    if (mq.matches) {
      this.openMenuButton.addEventListener("click", () => {
        document.getElementById("slideoutMenu").style.width = "100vw";
      });

      // when close menu button is pressed the slide out menu is closed
      this.closeMenuButton.addEventListener("click", () => {
        this.closeMenu();
      });
    }
    // if screen size is greater than 700px
    else {
      this.openMenuButton.addEventListener("click", () => {
        document.getElementById("slideoutMenu").style.width = "300px";
      });

      // when close menu button is pressed the slide out menu is closed
      this.closeMenuButton.addEventListener("click", () => {
        this.closeMenu();
      });
    }
  },

  // Function to initialize slide out menu related functionality
  init: function() {
    this.openMenuButton = document.getElementById('openButton');
    this.closeMenuButton = document.getElementById('closeButton');
    this.mediaQuery();
    window.addEventListener('resize', () => {
      this.mediaQuery();
    });
  },
};

// Initialize the slide out menu
SlideOutMenu.init();

// Event listener for dislike button
const dislikeButton = document.querySelector(".dislike");
dislikeButton.addEventListener("click", function() {
  MovieApp.removeMovie();
  MovieApp.fetchMovie();
});

// Event listener for the like button
const likeButton = document.querySelector(".like");
likeButton.addEventListener("click", function() {
  const currentMovie = document.querySelector(".movieName").textContent;
  const movieObj = { title: currentMovie };
  MovieApp.addLikedMovie(movieObj);
  MovieApp.removeMovie();
  MovieApp.fetchMovie();

  // Call the openMenuFirst function to open the slide out menu when the first movie is liked
  MovieAppUtils.openMenuFirst();
});

// Fetch the initial movie
MovieApp.fetchMovie();
