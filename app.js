// Create a namespace object
const MovieApp = {
  likedMovies: [],
  firstLike:true,
  maxLikedMovies: 5,

  fetchMovie: function() {
    const apiKey = "a86709241fa3002625b118e87d177b48";
    const baseUrl = "https://api.themoviedb.org/3";
    const page = Math.floor(Math.random() * 500);
    const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.displayMovie(data.results[0]))
      .catch(error => console.log(error)); // Handle errors
  },

  displayMovie: function(movie) {
    const imageContainer = document.querySelector(".imageContainer");
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const title = movie.title;
    const image = document.createElement("img"); // Create an <img> element
    image.src = posterUrl; // Set the source of the <img> element
    image.alt = `${title} poster`; // Set the alt text of the <img> element
    imageContainer.innerHTML = ""; // Clear the contents of the image container
    imageContainer.appendChild(image); // Add the <img> element to the image container
    document.querySelector(".movieName").textContent = title;
  },

  addLikedMovie: function(movie) {
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
  },

  removeMovie: function() {
    const imageContainer = document.querySelector(".imageContainer");
    imageContainer.innerHTML = "";
    document.querySelector(".movieName").textContent = "";
  },
};

// Event listener for dislike button
const dislikeButton = document.querySelector(".dislike");
dislikeButton.addEventListener("click", function() {
  MovieApp.removeMovie();
  MovieApp.fetchMovie();
});

// Event listener for like button
const likeButton = document.querySelector(".like");
likeButton.addEventListener("click", function() {
  const currentMovie = document.querySelector(".movieName").textContent;
  const movieObj = { title: currentMovie };
  MovieApp.addLikedMovie(movieObj);
  MovieApp.removeMovie();
  MovieApp.fetchMovie();
});


// Initial fetch
MovieApp.fetchMovie();

// slide out menu code:
const app = {};

// select the open and close menu buttons
app.openMenuButton = document.getElementById('openButton');
app.closeMenuButton = document.getElementById('closeButton');

// value that keeps track of whether the menu is open or not
// 
app.isOpen = true;

app.menuWidth = 0;

// function that closes the menu by setting its width to zero
app.closeMenu = function() {
  document.getElementById("slideoutMenu").style.width = "0";
  app.isOpen = false;
}

app.mediaQuery = function () {
  let mq = window.matchMedia('(max-width: 700px)');
  // if screen size is less than 700px
  if (mq.matches) {
    app.openMenuButton.addEventListener("click", () => {
      document.getElementById("slideoutMenu").style.width = "100vw";
    });

    // when close menu button is pressed the slide out menu is closed
    app.closeMenuButton.addEventListener("click", () => {
      app.closeMenu();
    });
    

    // if screen size is greater than 700px
  } else {
    app.openMenuButton.addEventListener("click", () => {
      document.getElementById("slideoutMenu").style.width = "300px";
    });

    // when close menu button is pressed the slide out menu is closed
    app.closeMenuButton.addEventListener("click", () => {
      app.closeMenu();
    });
    
  }
}

<<<<<<< HEAD
=======
// what to do when menu resizes
window.addEventListener('resize', function (event) {
  document.getElementById("slideoutMenu").style.width = "0";
  app.mediaQuery();
}, true);

app.mediaQuery();
>>>>>>> 7aee1c91a62ed0a930ca60a030a39f6b909edce1
