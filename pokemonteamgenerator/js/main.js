const pokemonTypeUrl = "https://pokeapi.co/api/v2/pokemon/";
const starterPokemon = document.querySelector("#starter-select");
const legendaryPokemon = document.querySelector("#include-legendaries");
const pokemonContainer = document.querySelector("#pokemon-container");
const numToString = {
    0 : "one",
    1 : "two",
    2 : "three",
    3 : "four",
    4 : "five",
    5 : "six"
};


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

async function fetchResource(url){
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
    let pokemonSpecies;
    let pokemon = [];
    let nameTag;
    let imageTag;
    for (let i = 0; i < 6; i++){
        nameTag = document.querySelector("#name-" + numToString[i]);
        imageTag = document.querySelector("#img-" + numToString[i]);
        do{
            randomNum = getRandomNumber(9, 150);
            pokemonSpecies = await fetchResource(pokedex.pokemon_entries[randomNum].pokemon_species.url);
        }while(pokemonSpecies.is_legendary || pokemonSpecies.is_mythical)
        pokemon.push(await fetchResource(pokemonTypeUrl + pokemonSpecies.name + "/"));
    }
    
    injectHTML(pokemon);
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
    pokemon = await fetchResource(pokedex.pokemon_entries[num].pokemon_species.url);
    console.log(pokemon);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function injectHTML(pokemon){
    pokemonContainer.innerHTML = `<div class="pokemon-box" id="member-one">
                <div class="member-img"><img src= ${pokemon[0].sprites.front_default} alt="" id="img-one"></div>
                <div class="pokemon-name" id="name-one">${capitalizeFirstLetter(pokemon[0].name)}</div>
            </div>
            <div class="pokemon-box" id="member-two">
                <div class="member-img"><img src=${pokemon[1].sprites.front_default} alt="" id="img-two"></div>
                <div class="pokemon-name" id="name-two">${capitalizeFirstLetter(pokemon[1].name)}</div>
            </div>
            <div class="pokemon-box" id="member-three">
                <div class="member-img"><img src=${pokemon[2].sprites.front_default} alt="" id="img-three"></div>
                <div class="pokemon-name" id="name-three">${capitalizeFirstLetter(pokemon[2].name)}</div>
            </div>
            <div class="pokemon-box" id="member-four">
                <div class="member-img"><img src=${pokemon[3].sprites.front_default} alt="" id="img-four"></div>
                <div class="pokemon-name" id="name-four">${capitalizeFirstLetter(pokemon[3].name)}</div>
            </div>
            <div class="pokemon-box" id="member-five">
                <div class="member-img"><img src=${pokemon[4].sprites.front_default} alt="" id="img-five"></div>
                <div class="pokemon-name" id="name-five">${capitalizeFirstLetter(pokemon[4].name)}</div>
            </div>
            <div class="pokemon-box" id="member-six">
                <div class="member-img"><img src=${pokemon[5].sprites.front_default} alt="" id="img-six"></div>
                <div class="pokemon-name" id="name-six">${capitalizeFirstLetter(pokemon[5].name)}</div>
            </div>`
}