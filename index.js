//function to search api database for movie title
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { 
            apikey: 'ed7394f',
            s: searchTerm 
        }
    } );

    return response.data.Search;
};

const input = document.querySelector('input');

//sets time interval. when the user stops typing fetchData request will be sent to api.
const onInput = async event => {
   const movies = await fetchData(event.target.value);
   
   for (let movie of movies) {
    const div = document.createElement('div');
    
    div.innerHTML = `
        <img src="${movie.Poster}" />
        <h1>${movie.Title}<h1/>
    `;

    document.querySelector('#target').appendChild(div);
   }
};
input.addEventListener('input', debounce(onInput, 500));

