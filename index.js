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

//sets time interval to 1 second. when the user stops typing fetchData request will be sent to api.
let timeoutId;
const onInput = event => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        fetchData(event.target.value);
}, 500);
};

input.addEventListener('input', onInput);

