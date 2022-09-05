// function to render movie info
const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
        `;
  },
  inputValue(movie) {
    return movie.Title;
  }, //function to search api database for movie title
  async fetchData(searchTerm) {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "ed7394f",
        s: searchTerm,
      },
    });

    if (response.data.Error) {
      return [];
    }
    return response.data.Search;
  },
};

//function that displays autocomplete widget
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  //hides tutorial message once message is clicked with is-hidden
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  }
});
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  }
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "ed7394f",
      i: movie.imdbID,
    },
  });

  summaryElement.innerHTML = movieTemplate(response.data);

 //checks if movie data are defined on screen if they are it will runComparison
  if (side === 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }
  
  if (leftMovie && rightMovie) {
    runComparison();  
}     
};

const runComparison = () => {
    console.log('time!!!');
};

const movieTemplate = movieDetail => {
  return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
            <img src="${movieDetail.Poster}" />
            </p>
            </figure>
            <div class="media-content">
                <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
                </div>
            </div>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
    `;
};
