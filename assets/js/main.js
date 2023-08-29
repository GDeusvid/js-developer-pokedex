

const pokemonList = document.getElementById("pokemonList");

const loadMoreButton = document.getElementById("loadMoreButton");
const limit =20;
let offset =0;
var maxRecord=1010;



function convertPokemonToLi(pokemon){
    return `<li id="${pokemon.name}" class="pokemon ${pokemon.type}">
    <span id="${pokemon.name}" class="number">#${pokemon.number}</span>
    <span id="${pokemon.name}" class="name">${pokemon.name}</span>
    <div id="${pokemon.name}" class="detail">
        <ol id="${pokemon.name}" class="types">
            ${pokemon.types.map((type)=>`<li id="${pokemon.name}" class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img id="${pokemon.name}" src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
    
</li> `

};

$(document).ready(function () {
    loadPokemonItems(offset,limit);
    
    
  });


loadMoreButton.addEventListener('click',()=>{
    offset += limit;
    const qtdRecordWithNextPage = offset + limit;
    if (qtdRecordWithNextPage >=  maxRecord){
        const newLimit = maxRecord - offset  ;
        loadPokemonItems(offset,newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else{
        loadPokemonItems(offset,limit);
    }

    
});




function loadPokemonItems(offset,limit){
    console.log("na função")
    pokeApi.getPokemons(offset,limit)
// caso nao venha nada por default pokemons = [] lista vazia
.then((pokemons = []) => {
    // const listItems = [];
    // for (let i=0; i< pokemons.length; i++){
    //     const pokemon = pokemons[i]; 
    //     listItems.push(convertPokemonToLi(pokemon));
        
    // }
    // console.log(listItems);

    // usando o map, vc resolve esse codigo acima de forma mais elegante:



    // pode escrever assim: const newList = pokemons.map((pokemon)=> convertPokemonToLi(pokemon));
    // pode escrever assim: const newList = pokemons.map(convertPokemonToLi);
    // pode escrever assim: const newList = pokemons.map(convertPokemonToLi).join('');
    // pode escrever assim: pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
    
    const newList = pokemons.map((pokemon)=> {
        return convertPokemonToLi(pokemon)
    });
    const newHtml = newList.join('');
    // pokemonList.innerHTML += newHtml;
    $("#pokemonList").append(newHtml)
    
    
    
    
})
.then(()=>{
    $(document).ready(function () {
        
        cliqueNoPokemon();
        
      });
    
})
.catch((error) => console.error(error));
}






// obs: para nao fazer isso: função dentro de função, callback em callback, podemos usar varios .then, dessa forma o response do prox vai ser o return do primeiro

// fetch(url)
// .then(function(response){
//     response.json().then(function(responseBody){
//         console.log(responseBody);
//     });
// })
// .catch(function(error){
//     console.log(error);
// })
// .finally(function(){
//     console.log(`Requisição concluida!`)
// });
// console.log("ola");

// obs: para nao fazer isso: usar arrow function

// fetch(url)
// .then(function(response){
//     return response.json();
// })
// .then(function(jsonBody){
//     console.log(jsonBody);
// })
// .catch(function(error){
//     console.log(error);
// })
// .finally(function(){
//     console.log(`Requisição concluida!`)
// });
// console.log("ola");




$("#load1generation").on("click", ()=>{
    $("#pokemonList").html("")
    $(".pokemonDetail").html("")
    offset =0;
    maxRecord=151;
    loadPokemonItems(offset,maxRecord);
    $("#loadMoreButton").hide();
 });

 $("#load2generation").on("click", ()=>{
    $("#pokemonList").html("")
    $(".pokemonDetail").html("")
    offset =151;
    maxRecord=100;
    loadPokemonItems(offset,maxRecord);
    $("#loadMoreButton").hide();
 });

$("#load3generation").on("click", ()=>{
    $("#pokemonList").html("")
    $(".pokemonDetail").html("")
    offset =251;
    maxRecord=135;
    loadPokemonItems(offset,maxRecord);
    $("#loadMoreButton").hide();
 });
 $("#load4generation").on("click", ()=>{
    $("#pokemonList").html("")
    $(".pokemonDetail").html("")
    offset =386;
    maxRecord=107;
    loadPokemonItems(offset,maxRecord);
    $("#loadMoreButton").hide();
 });
 $("#load5generation").on("click", ()=>{
    $("#pokemonList").html("")
    $(".pokemonDetail").html("")
    offset =493;
    maxRecord=156;
    loadPokemonItems(offset,maxRecord);
    $("#loadMoreButton").hide();
 });
 $("#load6generation").on("click", ()=>{
    $("#pokemonList").html("")
    $(".pokemonDetail").html("")
    offset =649;
    maxRecord=72;
    loadPokemonItems(offset,maxRecord);
    $("#loadMoreButton").hide();
 });
 $("#load7generation").on("click", ()=>{
    $("#pokemonList").html("")
    $(".pokemonDetail").html("")
    offset =721;
    maxRecord=88;
    loadPokemonItems(offset,maxRecord);
    $("#loadMoreButton").hide();
 });
 $("#load8generation").on("click", ()=>{
    $("#pokemonList").html("")
    $(".pokemonDetail").html("")
    offset =809;
    maxRecord=96;
    loadPokemonItems(offset,maxRecord);
    $("#loadMoreButton").hide();
 });
 $("#load9generation").on("click", ()=>{
    $("#pokemonList").html("")
    $(".pokemonDetail").html("")
    offset =905;
    maxRecord=105;
    loadPokemonItems(offset,maxRecord);
    $("#loadMoreButton").hide();
 });
 $("#loadallgeneration").on("click", ()=>{
    $("#pokemonList").html("")
    $(".pokemonDetail").html("")
    
    offset =0;
    maxRecord=1010;
    loadPokemonItems(offset,maxRecord);
    $("#loadMoreButton").hide();
 });
 $(".titulo").append("<a style='text-decoration:none;' target='_blank' href='https://github.com/GDeusvid'><h5>© 2023 David G.</h5></a>");