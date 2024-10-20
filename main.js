const starterPokemon = document.querySelector("#starter-select");
const legendaryPokemon = document.querySelector("#include-legendaries");
const nameOne = document.querySelector("#name-one");
const nameTwo = document.querySelector("#name-two");
const nameThree = document.querySelector("#name-three");
const nameFour = document.querySelector("#name-four");
const nameFive = document.querySelector("#name-five");
const nameSix = document.querySelector("#name-six");
const imageOne = document.querySelector("#img-one");
const imageTwo = document.querySelector("#img-two");
const imageThree = document.querySelector("#img-three");
const imageFour = document.querySelector("#img-four");
const imageFive = document.querySelector("#img-five");
const imageSix = document.querySelector("#img-six");


async function fetchPokedex(){
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

async function fetchPokemon(url){
    try{
        const response = await fetch(url);

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


async function generateTeam(){
    const pokedex = await fetchPokedex();
    let starterValue = starterPokemon.value;
    let legendaryValue = legendaryPokemon.checked;

    if (starterValue == -1 && !legendaryValue){
        noStarterNoLegendary(pokedex);
    }
    else if (starterValue == -1 && legendaryValue){
        noStarter(pokedex);
    }
    else if (starterValue == -2 && legendaryValue){
        randomStarter(pokedex);
    }
    else if (starterValue == -2 && !legendaryValue){
        randomStarterNoLegendary(pokedex);
    }
    else if (legendaryValue){
        noLegendary(pokedex);
    }
    else{
        selectedStarter(pokedex, starterValue);
    }


}

async function noStarterNoLegendary(pokedex){
    let randomNum;
    do{
        randomNum = getRandomNumber(9, 150);
        pokemon = await fetchPokemon(pokedex.pokemon_entries[randomNum].pokemon_species.url)
    }while(pokemon.is_legendary || pokemon.is_mythical)
    // console.log(pokemon.name);
    // nameOne.innerHTML = capitalizeFirstLetter(pokemon.name);
}

async function noStarter(pokedex){

}

async function noLegendary(pokedex){
    
}

async function randomStarterNoLegendary(pokedex){
    
}

async function randomStarter(pokedex){

}

async function selectedStarter(pokedex, num){
    //console.log(pokedex.pokemon_entries[num].pokemon_species.name);
    //console.log(pokedex.pokemon_entries[num].pokemon_species.url);
    pokemon = await fetchPokemon(pokedex.pokemon_entries[num].pokemon_species.url);
    console.log(pokemon);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

