const hamburger = document.querySelector(".hamburger");
const section = document.querySelector("section");
const mainHeroDiv = document.querySelector(".main");
const releaseDate = document.querySelector(".release_date");
const movieDescription = document.querySelector(".movie_description");
const mainTitle = document.querySelector(".main_title");
const searchBar = document.querySelector("input");
const content = document.querySelector(".content");
const searcher = document.querySelector(".searcher");

const okay = content.innerHTML;

const BASE_URL = `https://api.themoviedb.org/3/`;

const api_key = `c3d4a956b87c6d7f6369e0458d2813bc`;

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  section.classList.toggle("active");
});

function fetchHeroDiv() {
  try {
    fetch(`${BASE_URL}trending/movie/day?api_key=${api_key}`)
      .then((response) => response.json())
      .then((data) => {
        mainHeroDiv.style.backgroundImage = `url("http://image.tmdb.org/t/p/w500${data.results[0].backdrop_path}")`;
        releaseDate.innerHTML = `${data.results[0].release_date}`;
        mainTitle.innerHTML = `${data.results[0].title}`;
        console.log(data);
      });
  } catch (error) {
    console.log(error);
  }
}

fetchHeroDiv();

function searchMovie() {
  fetch(`${BASE_URL}search/movie?api_key=${api_key}&query=${searchBar.value}`)
    .then((response) => response.json())
    .then((data) => {
      const movies = Object.keys(data.results).map((movie) => {
        return `<div class="searcc"><img src="http://image.tmdb.org/t/p/w500${data.results[movie].poster_path}" alt="${data.results[movie].title}" /><p class="movieName"> ${data.results[movie].title}</p></div>`;
      });
      searcher.innerHTML = `<div class="search">${movies}</div>`;
      content.hidden = true;
      searcher.hidden = false;
    });
}

searchBar.addEventListener("keyup", () => {
  if (searchBar.value === "") {
    content.hidden = false;
    searcher.hidden = true;
  }
  window.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      searchMovie();
    }
  });
});
