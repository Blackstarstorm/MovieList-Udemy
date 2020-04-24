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
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInput = movieModal.querySelectorAll("input");
// or 
// const userInput = movieModal.getElementsByTagName("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

function toggleBackDrop() {
  backdrop.classList.toggle("visible");
};


function updateMovie() {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

function closeMovieDeletionModal() {
  toggleBackDrop();
  deleteMovieModal.classList.remove("visible");
};


function deleteMovieHandler(movieId) {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  // listRoot.removeChild(listRoot.children[movieIndex]);
  closeMovieDeletionModal();
  updateMovie();
};


function startDeleteMovieHandler(movieId) {
  deleteMovieModal.classList.add("visible");
  toggleBackDrop();
  const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");
  
  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

  cancelDeletionButton.removeEventListener("click", closeMovieDeletionModal);

  cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);

  confirmDeletionButton.addEventListener("click", deleteMovieHandler.bind(null, movieId));
  
};

function renderNewMovieElement(id, title, image, rating) {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `<div class="movie-element_image">
    <img src="${image}" alt="${title}">
  </div>
  <div class="movie-element_info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
  `;
  newMovieElement.addEventListener("click", startDeleteMovieHandler.bind(null, id))
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};


function closeMovieModal() {
  movieModal.classList.remove("visible");
};

function showMovieModal() {
  movieModal.classList.add("visible");
  toggleBackDrop();
};

function clearMovieInput() {
  for (const usrInput of userInput) {
    usrInput.value = "";
  }
};

function cancelAddMovie() {
  closeMovieModal();
  toggleBackDrop();
  clearMovieInput();
};

function addMovie() {
  const titleValue = userInput[0].value;
  const imageValue = userInput[1].value;
  const ratingValue = userInput[2].value;

  if (
    titleValue.trim() === "" ||
    imageValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please use valid values (rating is between 1 and 5.)");
    return;
  }
  
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackDrop();
  clearMovieInput();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateMovie();
};

function backdropClick() {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClick);
cancelAddMovieButton.addEventListener("click", cancelAddMovie);
confirmAddMovieButton.addEventListener("click", addMovie);