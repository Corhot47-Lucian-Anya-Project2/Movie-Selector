const MovieApp = {};

MovieApp.likedMovies = [];
MovieApp.maxLikedMovies = 5;

MovieApp.fetchMovie = function() {
  const apiKey = "a86709241fa3002625b118e87d177b48";
  const baseUrl = "https://api.themoviedb.org/3";
  const page = Math.floor(Math.random() * 500);
  const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
  fetch(url)
    .then(response => response.json())
    .then(data => this.displayMovie(data.results[0]))
    .catch(error => console.log(error)); // Handle errors
};

MovieApp.displayMovie = function(movie) {
  const imageContainer = document.querySelector(".imageContainer");
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const title = movie.title;
  const image = document.createElement("img"); // Create an <img> element
  image.src = posterUrl; // Set the source of the <img> element
  image.alt = `${title} poster`; // Set the alt text of the <img> element
  imageContainer.innerHTML = ""; // Clear the contents of the image container
  imageContainer.appendChild(image); // Add the <img> element to the image container
  document.querySelector(".movieName").textContent = title;
};

MovieApp.addLikedMovie = function(movie) {
  let isDuplicate = false;
  for (let i = 0; i < this.likedMovies.length; i++) {
    if (this.likedMovies[i].title === movie.title) {
      isDuplicate = true;
      break;
    }
  }
  if (!isDuplicate && this.likedMovies.length < this.maxLikedMovies) {
    this.likedMovies.push(movie);
    const likedMoviesList = document.querySelector("#likedMovies");
    const listItem = document.createElement("li");
    listItem.textContent = movie.title;
    likedMoviesList.appendChild(listItem);

    if (this.likedMovies.length === this.maxLikedMovies) {
      alert("You have liked 5 movies. You cannot like any more movies.");
      const likeButton = document.querySelector(".like");
      likeButton.disabled = true;
    }
  }
};

MovieApp.removeMovie = function() {
  const imageContainer = document.querySelector(".imageContainer");
  imageContainer.innerHTML = "";
  document.querySelector(".movieName").textContent = "";
};

MovieApp.likedFirstMovie = false;

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

const MovieAppUtils = {
  // Namespace for utility functions related to MovieApp
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

const SlideOutMenu = {
  // Namespace for slide out menu related functions
  openMenuButton: null,
  closeMenuButton: null,

  closeMenu: function() {
    document.getElementById("slideoutMenu").style.width = "0";
  },

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

  init: function() {
    // Initialize slide out menu related functions
    this.openMenuButton = document.getElementById('openButton');
    this.closeMenuButton = document.getElementById('closeButton');
    this.mediaQuery();
    window.addEventListener('resize', () => {
      this.mediaQuery();
    });
  },
};

SlideOutMenu.init();

// Event listener for dislike button
const dislikeButton = document.querySelector(".dislike");
dislikeButton.addEventListener("click", function() {
  MovieApp.removeMovie();
  MovieApp.fetchMovie();
});

const likeButton = document.querySelector(".like");
likeButton.addEventListener("click", function() {
  const currentMovie = document.querySelector(".movieName").textContent;
  const movieObj = { title: currentMovie };
  MovieApp.addLikedMovie(movieObj);
  MovieApp.removeMovie();
  MovieApp.fetchMovie();

  // Call openMenuFirst function here
  MovieAppUtils.openMenuFirst();
});

// Initial fetch
MovieApp.fetchMovie();

