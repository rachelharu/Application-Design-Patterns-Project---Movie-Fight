const fetchData = async () => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { 
            apikey: 'ed7394f',
            s: 'avengers' 
        }
    } );

    console.log(response.data);
};

fetchData();


// http://www.omdbapi.com/?apikey=[ed7394f]&