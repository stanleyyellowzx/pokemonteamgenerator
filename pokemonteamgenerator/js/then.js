//to get pokemon using pokeapi and .then and .catch instead of async functions

fetch("https://pokeapi.co/api/v2/pokedex/5/")
    .then(response => {
        if (!response.ok){
            throw new Error("Could not fetch resource.");
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));


