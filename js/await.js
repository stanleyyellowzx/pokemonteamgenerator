//getting data using pokeapi using async functions and await

testFunction();

async function fetchData(){

    try{
        const response = await fetch("https://pokeapi.co/api/v2/pokedex/2/");

        if (!response.ok){
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        return data;
    }
    catch(error){
        console.log(error);
    }
}

async function testFunction(){

    const pokedex = await fetchData();
    console.log(pokedex.pokemon_entries);
}