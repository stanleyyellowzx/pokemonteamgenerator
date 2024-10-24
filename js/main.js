const pokemonTypeUrl = "https://pokeapi.co/api/v2/pokemon/";
const starterPokemon = document.querySelector("#starter-select");
const legendaryPokemon = document.querySelector("#include-legendaries");
const pokemonContainer = document.querySelector("#pokemon-container");
const region = document.title.slice(0, document.title.indexOf(" ")).toLowerCase();
const numToString = {
    0 : "one",
    1 : "two",
    2 : "three",
    3 : "four",
    4 : "five",
    5 : "six"
};
const regionToNum = {
    kanto:2,
    johto:7,
    hoenn:4,
    sinnoh:6,
    unova:9,
    alola:21,
    galar:27,
    paldea:31
}
let pokedex;

async function fetchPokedex(){
    try{
        const response = await fetch("https://pokeapi.co/api/v2/pokedex/" + regionToNum[region] + "/");

        if (!response.ok){
            throw new Error("Could not fetch resource");
        }

        pokedex = await response.json();
    }
    catch(error){
        console.error(error);
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
        console.error(error);
    }
}

async function generateTeam(){
    let starterValue = Number(starterPokemon.value);
    let legendaryValue = legendaryPokemon.checked;
    
    if (starterValue === -1 && !legendaryValue){
        console.log("NO STARTER NO LEGENDARY");
        noStarterNoLegendary();
    }
    else if (starterValue === -1 && legendaryValue){
        console.log("NO STARTER YES LEGENDARY")
        noStarter();
    }
    else if (starterValue === -2 && legendaryValue){
        console.log("RANDOM STARTER YES LEGENDARY");
        randomStarter();
    }
    else if (starterValue === -2 && !legendaryValue){
        console.log("RANDOM STARTER NO LEGENDARY");
        randomStarterNoLegendary();
    }
    else if (!legendaryValue){
        console.log("selected starter no legendary");
        selectedStarterNoLegendary(starterValue);
    }
    else{
        console.log("SELECTED STARTER YES LEGENDARY");
        selectedStarter(starterValue);
    }
}

async function noStarterNoLegendary(){
    let randomNum;
    let pokemonSpecies;
    let pokemon = [];
    for (let i = 0; i < 6; i++){
        do{
            randomNum = getRandomNumber(9, pokedex.pokemon_entries.length - 1);
            pokemonSpecies = await fetchResource(pokedex.pokemon_entries[randomNum].pokemon_species.url);
        }while(pokemonSpecies.is_legendary || pokemonSpecies.is_mythical)
        pokemon.push(await fetchResource(pokemonTypeUrl + pokemonSpecies.id + "/"));
    }

    injectHTML(pokemon);
}

async function noStarter(){
    let randomNum;
    let pokemonSpecies;
    let pokemon = [];
    for (let i = 0; i < 6; i++){
        randomNum = getRandomNumber(9, pokedex.pokemon_entries.length - 1);
        pokemonSpecies = await fetchResource(pokedex.pokemon_entries[randomNum].pokemon_species.url);
        pokemon.push(await fetchResource(pokemonTypeUrl + pokemonSpecies.id + "/"));
    }
    
    injectHTML(pokemon);
}

async function selectedStarterNoLegendary(num){
    let randomNum;
    let pokemonSpecies;
    let pokemon = [];
    pokemonSpecies = await fetchResource(pokedex.pokemon_entries[num].pokemon_species.url);
    pokemon.push(await fetchResource(pokemonTypeUrl + pokemonSpecies.id + "/"));
    for (let i = 1; i < 6; i++){
        do{
            randomNum = getRandomNumber(9, pokedex.pokemon_entries.length - 1);
            pokemonSpecies = await fetchResource(pokedex.pokemon_entries[randomNum].pokemon_species.url);
        }while(pokemonSpecies.is_legendary || pokemonSpecies.is_mythical)
        pokemon.push(await fetchResource(pokemonTypeUrl + pokemonSpecies.id + "/"));
    }

    injectHTML(pokemon);
}

async function randomStarterNoLegendary(){
    let randomNum;
    let pokemonSpecies;
    let pokemon = [];
    randomNum = getRandomNumber(0, 8);
    pokemonSpecies = await fetchResource(pokedex.pokemon_entries[randomNum].pokemon_species.url);
    pokemon.push(await fetchResource(pokemonTypeUrl + pokemonSpecies.id + "/"));
    for (let i = 1; i < 6; i++){
        do{
            randomNum = getRandomNumber(9, pokedex.pokemon_entries.length - 1);
            pokemonSpecies = await fetchResource(pokedex.pokemon_entries[randomNum].pokemon_species.url);
        }while(pokemonSpecies.is_legendary || pokemonSpecies.is_mythical)
        pokemon.push(await fetchResource(pokemonTypeUrl + pokemonSpecies.id + "/"));
    }

    injectHTML(pokemon);
}

async function randomStarter(){
    let randomNum;
    let pokemonSpecies;
    let pokemon = [];
    randomNum = getRandomNumber(0, 8);
    pokemonSpecies = await fetchResource(pokedex.pokemon_entries[randomNum].pokemon_species.url);
    pokemon.push(await fetchResource(pokemonTypeUrl + pokemonSpecies.id + "/"));
    for (let i = 1; i < 6; i++){
        randomNum = getRandomNumber(9, pokedex.pokemon_entries.length - 1);
        pokemonSpecies = await fetchResource(pokedex.pokemon_entries[randomNum].pokemon_species.url);
        pokemon.push(await fetchResource(pokemonTypeUrl + pokemonSpecies.id + "/"));
    }

    injectHTML(pokemon);

}

async function selectedStarter(num){
    let randomNum;
    let pokemonSpecies;
    let pokemon = [];
    pokemonSpecies = await fetchResource(pokedex.pokemon_entries[num].pokemon_species.url);
    pokemon.push(await fetchResource(pokemonTypeUrl + pokemonSpecies.id + "/"));
    for (let i = 1; i < 6; i++){
        randomNum = getRandomNumber(9, pokedex.pokemon_entries.length - 1);
        pokemonSpecies = await fetchResource(pokedex.pokemon_entries[randomNum].pokemon_species.url);
        pokemon.push(await fetchResource(pokemonTypeUrl + pokemonSpecies.id + "/"));
    }

    injectHTML(pokemon);
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