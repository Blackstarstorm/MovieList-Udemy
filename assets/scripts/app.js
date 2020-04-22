const movieModal = document.getElementById("add-modal");
// or
// const movieModal = document.querySelector("#add-modal");
// or
// const movieModal = document.body.children[1];
const startAddMovieButton = document.querySelector("header button");
// or 
// const startAddMovieButton = document.querySelector("header").lastElementChild;
const backdrop = document.getElementById("backdrop");
// or
// const backdrop = document.body.firstElementChild;
const cancelAddMovieButton = movieModal.querySelector(".btn--passive");

function toggleBackDrop() {
  backdrop.classList.toggle("visible");
};

function toggleMovieModal() {
  movieModal.classList.toggle("visible");
  toggleBackDrop();
};

function cancelAddMovie() {
  toggleMovieModal();
};

function backdropClickHandler() {
  toggleMovieModal();
};

startAddMovieButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovie);