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
const movies = [];

function toggleBackDrop() {
  backdrop.classList.toggle("visible");
};

function toggleMovieModal() {
  movieModal.classList.toggle("visible");
  toggleBackDrop();
};

function clearMovieInput() {
  userInput[0].value = "";
}

function cancelAddMovie() {
  toggleMovieModal();
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
    title: titleValue,
    image: imageValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  toggleMovieModal();
  clearMovieInput();
};

function backdropClick() {
  toggleMovieModal();
};

startAddMovieButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClick);
cancelAddMovieButton.addEventListener("click", cancelAddMovie);
confirmAddMovieButton.addEventListener("click", addMovie);