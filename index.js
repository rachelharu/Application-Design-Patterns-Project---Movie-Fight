//function to search api database for movie title
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { 
            apikey: 'ed7394f',
            s: searchTerm 
        }
    } );

    console.log(response.data);
};

const input = document.querySelector('input');

// debounce ratelimiting function for reuse 
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        func.apply(null, args);
    }, delay);  
    };
};


//sets time interval. when the user stops typing fetchData request will be sent to api.
const onInput = event => {
    fetchData(event.target.value);
};
input.addEventListener('input', debounce(onInput, 500));

