// Base URL for JSON server
const baseURL = "http://localhost:3000/films";

// Fetch and display movies in the sidebar
function fetchMovies() {
  fetch(baseURL)
    .then((response) => response.json())
    .then((movies) => {
      localStorage.setItem("movies", JSON.stringify(movies)); // Save movies to localStorage
      populateMoviesList(movies);
      displayMovieDetails(movies[0]); // Display the first movie's details on load
    })
    .catch((error) => console.error("Error fetching movies:", error));
}

// Populate the list of movies in the sidebar
function populateMoviesList(movies) {
  const filmsList = document.getElementById("films");
  filmsList.innerHTML = "";

  movies.forEach((movie) => {
    const li = document.createElement("li");
    li.textContent = movie.title;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("nav-button");
    deleteButton.addEventListener("click", () => deleteMovie(movie, movies));

    if (movie.capacity - movie.tickets_sold <= 0) {
      li.classList.add("sold-out");
    } else {
      li.addEventListener("click", () => displayMovieDetails(movie));
    }

    li.appendChild(deleteButton);
    filmsList.appendChild(li);
  });
}

// Display movie details
function displayMovieDetails(movie) {
  document.getElementById("poster").src = movie.poster;
  document.getElementById("title").textContent = movie.title;
  document.getElementById("runtime").textContent = movie.runtime;
  document.getElementById("showtime").textContent = movie.showtime;
  document.getElementById("available-tickets").textContent = movie.capacity - movie.tickets_sold;

  const buyButton = document.getElementById("buy-ticket");
  buyButton.disabled = movie.capacity - movie.tickets_sold <= 0;

  buyButton.onclick = () => {
    if (movie.tickets_sold < movie.capacity) {
      const updatedTicketsSold = movie.tickets_sold + 1;

      fetch(`${baseURL}/${movie.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickets_sold: updatedTicketsSold }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to update tickets.");
          return response.json();
        })
        .then((updatedMovie) => {
          movie.tickets_sold = updatedMovie.tickets_sold;
          displayMovieDetails(movie);
          populateMoviesList(JSON.parse(localStorage.getItem("movies")));
        })
        .catch((error) => console.error("Error updating tickets:", error));
    }
  };
}

// Delete a movie
function deleteMovie(movie, movies) {
  fetch(`${baseURL}/${movie.id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to delete movie.");
      const updatedMovies = movies.filter((m) => m.id !== movie.id);
      localStorage.setItem("movies", JSON.stringify(updatedMovies));
      populateMoviesList(updatedMovies);
    })
    .catch((error) => console.error("Error deleting movie:", error));
}

// Highlight top movies with high ticket sales
function highlightTopMovies() {
  const storedMovies = localStorage.getItem("movies");
  const movies = storedMovies ? JSON.parse(storedMovies) : [];

  const topMovies = movies
    .filter(movie => movie.tickets_sold > movie.capacity * 0.75)
    .sort((a, b) => b.tickets_sold - a.tickets_sold);

  const topMoviesList = document.getElementById("top-movies");
  topMoviesList.innerHTML = "";

  topMovies.forEach((movie) => {
    const li = document.createElement("li");
    li.textContent = `${movie.title} - ${movie.tickets_sold} tickets sold`;
    topMoviesList.appendChild(li);
  });
}

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  fetchMovies();
  highlightTopMovies();
});
